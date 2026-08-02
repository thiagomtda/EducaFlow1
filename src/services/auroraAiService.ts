import { env } from '../config/env';
import { logger } from '../lib/logger';

export interface AuroraGenerateOptions {
  prompt: string;
  grade?: string;
  subject?: string;
  context?: Record<string, unknown>;
}

export interface AuroraGenerateResponse {
  success: boolean;
  content: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
  };
  error?: string;
}

export async function generateWithAuroraAi(
  options: AuroraGenerateOptions
): Promise<AuroraGenerateResponse> {
  logger.info('Solicitando geração de texto via Proxy Aurora AI Server-Side...', {
    promptLength: options.prompt.length,
    grade: options.grade,
  });

  try {
    const response = await fetch(env.NEXT_PUBLIC_AURORA_AI_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error(`Servidor Aurora AI retornou status ${response.status}`);
    }

    const data: AuroraGenerateResponse = await response.json();
    return data;
  } catch (err) {
    const errorMsg = String(err);
    logger.error('Erro ao comunicar com o serviço Aurora AI Proxy', { error: errorMsg });
    return {
      success: false,
      content: '',
      model: 'gemini-2.5-flash',
      error: errorMsg,
    };
  }
}
