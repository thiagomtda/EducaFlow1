import { db } from '../db/dexieDb';
import { supabaseBrowser } from '../services/supabase/client';
import { logger } from './logger';
import { useNetworkStore } from '../stores/useNetworkStore';

export async function processQueue() {
  if (typeof window === 'undefined') return;
  if (!navigator.onLine) {
    logger.warn('Sincronização abortada: Dispositivo offline.');
    return;
  }

  useNetworkStore.getState().setIsSyncing(true);

  try {
    const pendingItems = await db.syncQueue.toArray();
    if (pendingItems.length === 0) {
      useNetworkStore.getState().setIsSyncing(false);
      return;
    }

    logger.info(`Processando fila de sincronização de segundo plano: ${pendingItems.length} itens pendentes.`);

    for (const item of pendingItems) {
      let isSuccess = false;

      if (item.table === 'attendances') {
        const payload = item.payload;
        
        // Mapeia para os campos snake_case conforme as especificações solicitadas
        const mappedPayload = {
          student_id: payload.studentId,
          class_id: payload.classId,
          date: payload.date,
          status: payload.status,
          updated_at: payload.updatedAt,
        };

        const { error } = await supabaseBrowser
          .from('attendances')
          .upsert(mappedPayload);

        if (error) {
          logger.error(`Erro ao sincronizar item #${item.id} no Supabase (attendances):`, { error: error.message });
          continue; // Mantém na fila para tentar novamente depois
        }

        logger.info(`Item #${item.id} de presença sincronizado com sucesso no Supabase.`);
        isSuccess = true;
      } else if (item.table === 'student_logs') {
        const payload = item.payload;

        const mappedPayload = {
          student_id: payload.studentId,
          class_id: payload.classId,
          type: payload.type,
          tag: payload.tag,
          description: payload.description,
          date: payload.date,
          updated_at: payload.updatedAt,
        };

        const { error } = await supabaseBrowser
          .from('student_logs')
          .upsert(mappedPayload);

        if (error) {
          logger.error(`Erro ao sincronizar item #${item.id} no Supabase (student_logs):`, { error: error.message });
          continue;
        }

        logger.info(`Item #${item.id} de ocorrência/registro sincronizado com sucesso no Supabase.`);
        isSuccess = true;
      } else if (item.table === 'grades') {
        const payload = item.payload;

        const mappedPayload = {
          student_id: payload.studentId,
          class_id: payload.classId,
          subject: payload.subject,
          evaluation_name: payload.evaluationName,
          grade: payload.grade,
          date: payload.date,
          updated_at: payload.updatedAt,
        };

        const { error } = await supabaseBrowser
          .from('grades')
          .upsert(mappedPayload);

        if (error) {
          logger.error(`Erro ao sincronizar item #${item.id} no Supabase (grades):`, { error: error.message });
          continue;
        }

        logger.info(`Item #${item.id} de nota sincronizado com sucesso no Supabase.`);
        isSuccess = true;
      } else {
        // Tabela desconhecida, considera sucesso para não travar a fila
        isSuccess = true;
      }

      // Em caso de sucesso ou tabela desconhecida, remove da fila local
      if (isSuccess && item.id !== undefined) {
        await db.syncQueue.delete(item.id);
      }
    }

    const remainingCount = await db.syncQueue.count();
    useNetworkStore.getState().setPendingSyncCount(remainingCount);
    useNetworkStore.getState().setLastSyncTimestamp(new Date().toISOString());

  } catch (err) {
    logger.error('Erro no processamento da fila de sincronização:', { error: String(err) });
  } finally {
    useNetworkStore.getState().setIsSyncing(false);
  }
}

let isAutoSyncInitialized = false;

export function initAutoSync() {
  if (typeof window === 'undefined' || isAutoSyncInitialized) return;

  window.addEventListener('online', () => {
    logger.info('Dispositivo online detectado pelo motor de sincronização! Iniciando processamento da fila...');
    useNetworkStore.getState().setOnlineStatus(true);
    processQueue();
  });

  window.addEventListener('offline', () => {
    logger.warn('Dispositivo desconectado. Fila de sincronização pausada.');
    useNetworkStore.getState().setOnlineStatus(false);
  });

  isAutoSyncInitialized = true;
  logger.info('Serviço de sincronização automática (initAutoSync) inicializado com sucesso.');
}
