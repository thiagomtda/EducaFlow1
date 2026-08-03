import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, grade, subject, topic } = body;

    if (!prompt && !topic) {
      return new Response(
        JSON.stringify({ success: false, error: 'O parâmetro "prompt" ou "topic" é obrigatório.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Chave GEMINI_API_KEY não configurada no servidor proxy.',
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

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

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: finalPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const content = response.text || 'Nenhum conteúdo retornado pelo modelo.';

    return new Response(
      JSON.stringify({
        success: true,
        content,
        model: 'gemini-2.5-flash',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ success: false, error: errorMsg }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
