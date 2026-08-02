import { db } from '../db/dexieDb';
import { supabaseBrowser } from './supabase/client';
import { useNetworkStore } from '../stores/useNetworkStore';
import { logger } from '../lib/logger';
import { AppConstants, SUPABASE_TABLES } from '../constants';

export class SyncEngine {
  private isProcessing = false;

  public async processQueue(): Promise<{ processed: number; errors: number }> {
    if (this.isProcessing) {
      return { processed: 0, errors: 0 };
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      logger.info('Dispositivo offline. Processamento da fila de sincronização suspenso.');
      return { processed: 0, errors: 0 };
    }

    this.isProcessing = true;
    useNetworkStore.getState().setIsSyncing(true);

    let processedCount = 0;
    let errorCount = 0;

    try {
      const pendingItems = await db.syncQueue
        .where('status')
        .equals('PENDING')
        .limit(20)
        .toArray();

      useNetworkStore.getState().setPendingSyncCount(pendingItems.length);

      if (pendingItems.length === 0) {
        this.isProcessing = false;
        useNetworkStore.getState().setIsSyncing(false);
        return { processed: 0, errors: 0 };
      }

      logger.info(`Iniciando envio de ${pendingItems.length} itens da fila local para o Supabase...`);

      for (const item of pendingItems) {
        try {
          let tableName: string = SUPABASE_TABLES.ATTENDANCE;
          if (item.entity === 'lessonJournal') tableName = SUPABASE_TABLES.LESSON_JOURNALS;
          if (item.entity === 'lessonPlan') tableName = SUPABASE_TABLES.LESSON_PLANS;
          if (item.entity === 'student') tableName = SUPABASE_TABLES.STUDENTS;

          if (item.action === 'CREATE' || item.action === 'UPDATE') {
            const { error } = await supabaseBrowser
              .from(tableName)
              .upsert(item.payload);

            if (error) throw error;
          } else if (item.action === 'DELETE') {
            const { error } = await supabaseBrowser
              .from(tableName)
              .delete()
              .eq('id', String(item.payload.id));

            if (error) throw error;
          }

          if (item.id) {
            await db.syncQueue.update(item.id, {
              status: 'SUCCESS',
            });
          }

          processedCount++;
        } catch (err) {
          errorCount++;
          const errorMsg = String(err);
          logger.error(`Falha ao sincronizar item #${item.id} [${item.entity}]`, { error: errorMsg });

          if (item.id) {
            const retries = (item.retries || 0) + 1;
            await db.syncQueue.update(item.id, {
              retries,
              status: retries >= AppConstants.MAX_SYNC_RETRIES ? 'ERROR' : 'PENDING',
              lastErrorMessage: errorMsg,
            });
          }
        }
      }

      const remainingPending = await db.syncQueue.where('status').equals('PENDING').count();
      useNetworkStore.getState().setPendingSyncCount(remainingPending);
      useNetworkStore.getState().setLastSyncTimestamp(new Date().toISOString());

      logger.info(`Sincronização concluída: ${processedCount} itens enviados com sucesso, ${errorCount} erros.`);
    } catch (globalErr) {
      logger.error('Erro global no motor de sincronização', { error: String(globalErr) });
    } finally {
      this.isProcessing = false;
      useNetworkStore.getState().setIsSyncing(false);
    }

    return { processed: processedCount, errors: errorCount };
  }

  public async enqueue(
    entity: 'attendance' | 'lessonJournal' | 'lessonPlan' | 'student',
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    payload: Record<string, unknown>
  ): Promise<number> {
    const uuid = `sync-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const id = await db.syncQueue.add({
      uuid,
      entity,
      action,
      payload,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      retries: 0,
    });

    const pendingCount = await db.syncQueue.where('status').equals('PENDING').count();
    useNetworkStore.getState().setPendingSyncCount(pendingCount);

    logger.info(`Novo evento enfileirado no Dexie #${id} [${entity}:${action}]`, payload);

    if (navigator.onLine) {
      setTimeout(() => this.processQueue(), 500);
    }

    return id;
  }
}

export const syncEngine = new SyncEngine();
