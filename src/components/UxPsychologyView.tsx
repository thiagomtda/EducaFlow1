import { 
  Brain, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Smartphone, 
  WifiOff, 
  CheckCircle2, 
  Eye, 
  Clock, 
  HeartHandshake 
} from 'lucide-react';

export const UxPsychologyView = () => {
  return (
    <div className="p-8 space-y-6 overflow-y-auto h-full bg-slate-50">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800 shadow-lg relative overflow-hidden">
        <div className="space-y-2 relative z-10 max-w-3xl">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30 uppercase tracking-widest inline-block">
            Psicologia Cognitiva & Ergonomia Digital
          </span>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Pilares da Experiência do Professor no EducaFlow
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Professores enfrentam sobrecarga cognitiva, hipervigilância em sala de aula e estresse burocrático constante. A interface do EducaFlow foi desenhada segundo diretrizes de ergonomia cognitiva para agir como um <strong>antídoto à exaustão docente</strong>.
          </p>
        </div>
      </div>

      {/* Grid of the 6 Core UX Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">1. Carga Cognitiva Mínima (Lei de Hick)</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminação total de menus profundos e opções concorrentes. A plataforma antecipa a intenção do professor baseada no horário da aula e apresenta apenas a ação necessária naquele exato segundo.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">2. Tolerância a Erros & Sem Culpa</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Professores têm pavor de apagar dados acidentalmente ou preencher diários incorretos. Todas as ações possuem salvamento automático instantâneo, histórico de desfazer (Ctrl+Z) e linguagem encorajadora.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">3. Operação Unimanual Mobile</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Durante a regência em sala, o professor segura o celular com uma mão enquanto orienta as crianças. Controles críticos de chamada e hipóteses ficam situados no alcance do polegar na metade inferior da tela.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <WifiOff className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">4. Tolerância Zero a Quedas de Conexão</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Redes de escolas públicas brasileiras oscilam constantemente. O EducaFlow opera no paradigma <em>Offline-First Local Storage</em>, sincronizando em segundo plano quando a conexão é restabelecida.
          </p>
        </div>

        {/* Pillar 5 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">5. Conforto Visual & Descanso para os Olhos</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Professores passam horas à noite corrigindo cadernos e planejando aulas. A paleta de cores adota neutros frios e quentes suavizados, sem fundos branco puro nem contrastes agressivos que causem fadiga ocular.
          </p>
        </div>

        {/* Pillar 6 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">6. Acolhimento & Respeito ao Tempo Livre</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            A plataforma comemora a conclusão das tarefas com mensagens de alívio e estimula o encerramento da jornada com o botão "Encerrar Dia do Professor", incentivando o desligamento do trabalho à noite.
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="p-6 bg-indigo-950 text-white rounded-xl border border-indigo-900 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider">Conclusão da Arquitetura de Experiência</p>
          <p className="text-sm font-semibold text-white">
            Ao transformar a plataforma em uma sequência natural de missões acolhedoras, o EducaFlow reduz o estresse da rotina e devolve ao professor o prazer de ensinar.
          </p>
        </div>
      </div>
    </div>
  );
};
