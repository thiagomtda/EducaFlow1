import { GoogleGenAI } from '@google/genai';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, grade, subject } = body;

    if (!prompt) {
      return new Response(
        JSON.stringify({ success: false, error: 'O parâmetro "prompt" é obrigatório.' }),
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

    const systemInstruction = `Você é o Aurora AI, assistente pedagógico especializado no Ensino Fundamental I (BNCC).
Grau Escolar: ${grade || 'Ensino Fundamental I'}.
Disciplina: ${subject || 'Geral'}.
Responda de forma direta, clara e pedagógica em português do Brasil.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
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
