import React, { useState } from 'react';
import { useDexieData } from '../../hooks/useDexieData';
import { scanAllStudentsRisk, StudentRiskProfile } from '../../lib/auroraRiskEngine';
import { 
  Sparkles, 
  AlertTriangle, 
  AlertCircle, 
  ChevronRight, 
  Loader2, 
  X, 
  Copy, 
  Check,
  Calendar,
  UserCheck,
  TrendingDown,
  Info
} from 'lucide-react';
import Markdown from 'react-markdown';

export default function AuroraAlertsWidget() {
  const { allStudents, allClasses, attendanceRecords, studentLogs } = useDexieData();
  const [selectedStudent, setSelectedStudent] = useState<StudentRiskProfile | null>(null);
  const [guidanceText, setGuidanceText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // 1. Scan and filter students
  const riskProfiles = scanAllStudentsRisk(allStudents, allClasses, attendanceRecords, studentLogs);
  const atRiskStudents = riskProfiles.filter(p => p.riskLevel === 'HIGH' || p.riskLevel === 'MEDIUM');

  // Count high vs medium
  const highRiskCount = atRiskStudents.filter(p => p.riskLevel === 'HIGH').length;
  const mediumRiskCount = atRiskStudents.filter(p => p.riskLevel === 'MEDIUM').length;

  // 2. Generate Pedagogical Guidance via /api/aurora
  const handleGenerateGuidance = async (profile: StudentRiskProfile) => {
    setSelectedStudent(profile);
    setIsLoading(true);
    setGuidanceText('');
    setApiError(null);
    setCopied(false);

    // Fetch student's specific logs
    const studentLogsForPrompt = studentLogs.filter(l => l.studentId === profile.studentId);

    const promptText = `Você está analisando o histórico escolar e de engajamento de um aluno em risco de evasão ou baixo rendimento escolar.

Dados do Aluno:
- Nome: ${profile.name}
- Turma: ${profile.className}
- Frequência Escolar Atual: ${profile.attendanceRate.toFixed(1)}%
- Histórico de faltas consecutivas recentes: ${profile.consecutiveAbsences} faltas
- Quantidade de Alertas/Ocorrências Comportamentais recentes (últimos 14 dias): ${profile.recentAlertsCount}

Motivos detectados pelo sistema:
${profile.reasons.map(r => `- ${r}`).join('\n')}

Histórico Recente de Ocorrências e Alertas:
${studentLogsForPrompt.length > 0 
  ? studentLogsForPrompt.map(l => `[${l.date}] [${l.type}] ${l.tag}: ${l.description}`).join('\n')
  : 'Nenhum registro comportamental no período.'
}

Por favor, forneça uma análise pedagógica humana, empática e acionável para o Coordenador Escolar e para a Professora.
Forneça exatamente as seguintes seções estruturadas no padrão da BNCC:
1. **Análise de Situação**: Explicação breve do que os indicadores sugerem.
2. **Recomendações para a Sala de Aula**: Atitudes ou abordagens práticas que o professor pode adotar.
3. **Plano de Ação para a Coordenação**: Como abordar a família ou o aluno de forma acolhedora.
4. **Metas de Recuperação**: Metas razoáveis de engajamento e frequência.`;

    try {
      const response = await fetch('/api/aurora', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: promptText,
          grade: profile.className.split(' - ')[0] || 'Ensino Fundamental I',
          subject: 'Geral',
          topic: 'Intervenção de Risco Pedagógico'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setGuidanceText(data.content);
      } else {
        // Fallback friendly mock in case API key is missing or server is offline
        console.warn('Failing back to offline mock recommendation...');
        const mockResponse = generateLocalMockGuidance(profile, studentLogsForPrompt);
        setGuidanceText(mockResponse);
        setApiError(data.error || 'Usando modo local offline de simulação de IA.');
      }
    } catch (err) {
      console.error('Error generating AI guidance:', err);
      const mockResponse = generateLocalMockGuidance(profile, studentLogsForPrompt);
      setGuidanceText(mockResponse);
      setApiError('Conexão offline. Exibindo diagnóstico gerado pelo motor local de simulação.');
    } finally {
      setIsLoading(false);
    }
  };

  // Local helper to generate offline backup guidance
  const generateLocalMockGuidance = (profile: StudentRiskProfile, logs: any[]) => {
    const isHigh = profile.riskLevel === 'HIGH';
    return `### 🌟 Análise de Risco Preventiva - Aurora AI (Modo de Simulação Local)

**Estudante:** ${profile.name}  
**Turma:** ${profile.className}  
**Classificação:** ${isHigh ? '🔴 RISCO ALTO' : '🟡 RISCO MÉDIO'}  
**Frequência:** ${profile.attendanceRate.toFixed(1)}% | **Faltas Seguidas:** ${profile.consecutiveAbsences} | **Ocorrências Recentes:** ${profile.recentAlertsCount}

---

#### 1. Análise de Situação
O aluno apresenta um quadro que necessita de ${isHigh ? 'intervenção urgente e prioritária' : 'acompanhamento preventivo próximo'}. 
${profile.reasons.map(r => `* **${r}**: Indicador crítico que afeta a continuidade pedagógica e a fixação de competências essenciais da BNCC.`).join('\n')}
${logs.length > 0 ? `As ocorrências registradas recentemente (${logs.map(l => l.tag).join(', ')}) apontam que fatores emocionais, desinteresse ou problemas externos estão impactando diretamente no comportamento em sala de aula.` : 'Não há registros comportamentais recentes graves, indicando que a dificuldade principal se concentra na assiduidade escolar.'}

#### 2. Recomendações para a Sala de Aula
* **Acolhimento Individualizado**: Dedicar 5 minutos na entrada para conversar de forma amistosa com o estudante, reforçando que a sua presença faz falta no grupo.
* **Metodologias Ativas**: Engajar o aluno em atividades práticas e colaborativas de matemática ou português, preferencialmente em duplas produtivas com colegas de bom engajamento.
* **Flexibilização de Entregas**: Se houver tarefas atrasadas devido às faltas, conceder prazos alternativos para evitar o sentimento de incapacidade ou abandono.

#### 3. Plano de Ação para a Coordenação
* **Contato Humano com os Responsáveis**: Ligar para o responsável (ex: através do telefone de cadastro) com um tom de apoio e escuta ativa, perguntando se a família necessita de apoio ou se há questões de saúde/transporte afetando a frequência.
* **Entrevista de Acolhimento**: Agendar uma conversa presencial breve para estabelecer uma parceria de suporte mútuo entre escola e lar.
* **Busca Ativa Preventiva**: Caso ocorra mais uma falta sem justificativa, realizar o acionamento imediato do protocolo de busca ativa.

#### 4. Metas de Recuperação
* **Meta de Frequência Curto Prazo**: Elevar a frequência semanal para no mínimo 85% nas próximas duas semanas.
* **Meta de Engajamento**: Concluir 100% das tarefas propostas em sala com auxílio do monitor ou regente.
* **Avaliação de Progresso**: Reunião de alinhamento entre professor e coordenação em 14 dias para avaliar melhorias de foco e presença.`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(guidanceText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-850 rounded-2xl p-5 space-y-5 shadow-xl shadow-slate-950/25">
      {/* Widget Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-850">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              Painel de Alertas Preventivos
              <span className="flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-400 font-extrabold px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-wide">
                <Sparkles className="w-3 h-3 text-indigo-400" />
                Aurora AI
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Identificação inteligente de estudantes com risco de evasão ou atraso pedagógico
            </p>
          </div>
        </div>

        {/* Counter Badges */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {highRiskCount > 0 && (
            <span className="px-2.5 py-1 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs font-bold flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              {highRiskCount} Risco Alto
            </span>
          )}
          {mediumRiskCount > 0 && (
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              {mediumRiskCount} Risco Médio
            </span>
          )}
          {atRiskStudents.length === 0 && (
            <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold">
              100% Estável
            </span>
          )}
        </div>
      </div>

      {/* List / Empty State */}
      {atRiskStudents.length === 0 ? (
        <div className="bg-slate-950/40 border border-dashed border-slate-800 p-8 rounded-xl text-center space-y-2">
          <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-5 h-5 stroke-[3]" />
          </div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Nenhum Aluno em Risco</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Excelente! Todos os alunos cadastrados apresentam frequência acima de 85% e comportamento estável nas últimas duas semanas.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1 scrollbar-thin">
          {atRiskStudents.map((student) => {
            const isHigh = student.riskLevel === 'HIGH';
            return (
              <div 
                key={student.studentId}
                className={`bg-slate-950/40 border rounded-xl p-4 transition-all duration-200 hover:bg-slate-950 flex flex-col md:flex-row justify-between md:items-center gap-4 ${
                  isHigh 
                    ? 'border-rose-500/20 hover:border-rose-500/40 bg-gradient-to-r from-rose-950/5 to-transparent' 
                    : 'border-amber-500/20 hover:border-amber-500/40 bg-gradient-to-r from-amber-950/5 to-transparent'
                }`}
              >
                <div className="space-y-2.5 flex-1">
                  {/* Student Title and class info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-extrabold text-white">{student.name}</h4>
                    <span className="text-[10px] bg-slate-800 border border-slate-700 text-slate-300 px-2 py-0.5 rounded font-medium">
                      {student.className}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      isHigh 
                        ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25' 
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                    }`}>
                      {isHigh ? 'Risco Alto' : 'Risco Médio'}
                    </span>
                  </div>

                  {/* Concrete indicators values */}
                  <div className="grid grid-cols-3 gap-3 max-w-md">
                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850 flex flex-col justify-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Frequência</span>
                      <span className={`text-xs font-black mt-0.5 ${
                        student.attendanceRate < 75 ? 'text-rose-400' : student.attendanceRate < 85 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {student.attendanceRate.toFixed(1)}%
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850 flex flex-col justify-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Faltas Seguidas</span>
                      <span className={`text-xs font-black mt-0.5 ${
                        student.consecutiveAbsences >= 3 ? 'text-rose-400' : student.consecutiveAbsences > 0 ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {student.consecutiveAbsences} {student.consecutiveAbsences === 1 ? 'falta' : 'faltas'}
                      </span>
                    </div>

                    <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-850 flex flex-col justify-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Alertas Comport.</span>
                      <span className={`text-xs font-black mt-0.5 ${
                        student.recentAlertsCount >= 2 ? 'text-rose-400' : student.recentAlertsCount === 1 ? 'text-amber-400' : 'text-slate-400'
                      }`}>
                        {student.recentAlertsCount} {student.recentAlertsCount === 1 ? 'alerta' : 'alertas'}
                      </span>
                    </div>
                  </div>

                  {/* Reason descriptions */}
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Info className="w-3 h-3 text-slate-500" /> Motivos do Alerta:
                    </p>
                    <div className="flex flex-wrap gap-1.5 pl-1">
                      {student.reasons.map((reason, idx) => (
                        <span key={idx} className="text-[11px] text-slate-300 font-medium">
                          • {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI Action CTA Button */}
                <div className="shrink-0 flex items-center">
                  <button
                    onClick={() => handleGenerateGuidance(student)}
                    className="w-full md:w-auto py-2.5 px-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 active:from-indigo-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/10 group border border-indigo-500/20"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-200 group-hover:scale-110 transition-transform" />
                    Gerar Orientação da Aurora
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* AI Guidance Dialog Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-850 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-850 flex justify-between items-start gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/20 animate-pulse">
                  <Sparkles className="w-5 h-5 text-indigo-100" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                    Orientação Pedagógica da Aurora AI
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">
                    Diagnóstico preventivo para <strong className="text-slate-200 font-bold">{selectedStudent.name}</strong> • {selectedStudent.className}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1.5 bg-slate-950 hover:bg-slate-850 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Modal Body / Loading State */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {isLoading ? (
                <div className="py-20 flex flex-col items-center justify-center space-y-4 text-center">
                  <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                  <div className="space-y-1">
                    <p className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Consultando Aurora AI...</p>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Analisando histórico de chamada, registros comportamentais recentes e cruzando dados com as diretrizes da BNCC.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Indicators Recap Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/60 p-4 rounded-xl border border-slate-850">
                    <div className="text-center sm:text-left">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                        <TrendingDown className="w-3.5 h-3.5 text-rose-400" /> Frequência Atual
                      </span>
                      <p className="text-base font-extrabold text-white mt-1">{selectedStudent.attendanceRate.toFixed(1)}%</p>
                    </div>

                    <div className="text-center sm:text-left">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                        <Calendar className="w-3.5 h-3.5 text-rose-400" /> Ausências Consecutivas
                      </span>
                      <p className="text-base font-extrabold text-white mt-1">{selectedStudent.consecutiveAbsences} faltas</p>
                    </div>

                    <div className="text-center sm:text-left">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1 justify-center sm:justify-start">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Alertas Comportamentais
                      </span>
                      <p className="text-base font-extrabold text-white mt-1">{selectedStudent.recentAlertsCount} registros</p>
                    </div>

                    <div className="text-center sm:text-left flex flex-col justify-center">
                      <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Grau de Alerta</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider w-fit mx-auto sm:mx-0 mt-1.5 ${
                        selectedStudent.riskLevel === 'HIGH' 
                          ? 'bg-rose-500/15 text-rose-400 border border-rose-500/25' 
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/25'
                      }`}>
                        {selectedStudent.riskLevel === 'HIGH' ? 'Risco Alto' : 'Risco Médio'}
                      </span>
                    </div>
                  </div>

                  {apiError && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-xl text-xs flex items-start gap-2">
                      <Info className="w-4 h-4 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Aviso do Sistema</p>
                        <p className="opacity-90">{apiError}</p>
                      </div>
                    </div>
                  )}

                  {/* AI Generated Markdown Response */}
                  <div className="markdown-body text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/20 p-5 rounded-xl border border-slate-850/50 prose prose-invert max-w-none prose-xs prose-headings:text-white prose-strong:text-white prose-a:text-indigo-400">
                    <Markdown>{guidanceText}</Markdown>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-850 bg-slate-950/40 flex justify-between items-center gap-3">
              <span className="text-[10px] text-slate-500 font-mono font-bold">
                Aurora AI v2.5-Flash • EducaFlow
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Fechar
                </button>
                {!isLoading && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-indigo-600/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-indigo-200" />
                        Copiado!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-indigo-200" />
                        Copiar Orientação
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
