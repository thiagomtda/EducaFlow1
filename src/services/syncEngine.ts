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
          const tableName = item.table;

          if (item.action === 'INSERT' || item.action === 'UPDATE') {
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
            await db.syncQueue.delete(item.id);
          }

          processedCount++;
        } catch (err) {
          errorCount++;
          const errorMsg = String(err);
          logger.error(`Falha ao sincronizar item #${item.id} [${item.table}]`, { error: errorMsg });
        }
      }

      const remainingPending = await db.syncQueue.count();
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
    table: string,
    action: 'INSERT' | 'UPDATE' | 'DELETE',
    payload: any
  ): Promise<number> {
    const id = await db.syncQueue.add({
      table,
      action,
      payload,
      createdAt: new Date().toISOString(),
    });

    const pendingCount = await db.syncQueue.count();
    useNetworkStore.getState().setPendingSyncCount(pendingCount);

    logger.info(`Novo evento enfileirado no Dexie #${id} [${table}:${action}]`, payload);

    if (navigator.onLine) {
      setTimeout(() => this.processQueue(), 500);
    }

    return id;
  }
}

export const syncEngine = new SyncEngine();
