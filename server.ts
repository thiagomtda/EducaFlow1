import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route first
  app.post('/api/aurora', async (req, res) => {
    try {
      const { prompt, grade, subject, topic } = req.body;

      if (!prompt && !topic) {
        return res.status(400).json({ success: false, error: 'O parâmetro "prompt" ou "topic" é obrigatório.' });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({
          success: false,
          error: 'Chave GEMINI_API_KEY não configurada no servidor proxy.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const systemInstruction = `Você é o Aurora AI, assistente pedagógico especializado no Ensino Fundamental I e na BNCC (Base Nacional Comum Curricular).
Sua missão é atuar como uma assistente pedagógica especialista, gerando propostas didáticas estruturadas de alta qualidade no padrão da BNCC, em português do Brasil.`;

      let finalPrompt = prompt;
      if (!prompt && topic) {
        finalPrompt = `Gere um plano de aula completo, prático e detalhado estruturado contendo as seguintes seções principais:
1. **Habilidades da BNCC Relacionadas**: Liste os códigos oficiais da BNCC (ex: EF03MA01) e sua descrição correspondente.
2. **Objetivos de Aprendizagem**: Liste claramente de 2 a 4 objetivos que os alunos devem alcançar nesta aula.
3. **Metodologia / Passo a Passo**: Descreva minuciosamente o fluxo cronológico da aula (Introdução/Acolhida, Desenvolvimento da Explicação, Atividade Prática em Grupo ou Individual, e Conclusão/Fechamento).
4. **Forma de Avaliação**: Forneça propostas de avaliação formativa e critérios claros para observar a compreensão do conteúdo.

Detalhes da Aula solicitada:
- **Disciplina/Matéria**: ${subject || 'Geral'}
- **Ano Escolar / Série**: ${grade || 'Ensino Fundamental I'}
- **Tema Central**: ${topic}`;
      }

      // Using gemini-2.5-flash as specified by user requirements
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: finalPrompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const content = response.text || 'Nenhum conteúdo retornado pelo modelo.';

      return res.status(200).json({
        success: true,
        content,
        model: 'gemini-2.5-flash',
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ success: false, error: errorMsg });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
