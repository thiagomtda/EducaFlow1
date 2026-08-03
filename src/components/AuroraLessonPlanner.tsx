import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { generateWithAuroraAi } from '../services/auroraAiService';
import { logger } from '../lib/logger';
import { 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Clipboard, 
  Check, 
  ArrowRight, 
  Download, 
  AlertTriangle 
} from 'lucide-react';

export default function AuroraLessonPlanner() {
  const [subject, setSubject] = useState('Matemática');
  const [grade, setGrade] = useState('3º Ano');
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subjects = [
    'Matemática',
    'Língua Portuguesa',
    'Ciências da Natureza',
    'História',
    'Geografia',
    'Artes',
    'Ensino Religioso'
  ];

  const grades = [
    '1º Ano',
    '2º Ano',
    '3º Ano',
    '4º Ano',
    '5º Ano'
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Por favor, informe o tema da aula.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLessonPlan(null);

    try {
      logger.info('Gerando plano de aula com a Aurora AI...', { subject, grade, topic });
      
      const response = await generateWithAuroraAi({
        prompt: '', // Prompt empty triggers the structured subject/grade/topic generation in the API
        grade,
        subject,
        context: { topic }
      });

      if (response.success && response.content) {
        setLessonPlan(response.content);
        logger.info('Plano de aula gerado com sucesso pela Aurora AI.');
      } else {
        throw new Error(response.error || 'Não foi possível obter resposta do servidor da Aurora AI.');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      logger.error('Erro na geração de plano de aula da Aurora AI:', { error: msg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!lessonPlan) return;
    navigator.clipboard.writeText(lessonPlan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!lessonPlan) return;
    const blob = new Blob([lessonPlan], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Plano_de_Aula_Aurora_${subject.replace(/\s+/g, '_')}_${grade.replace(/\s+/g, '_')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Planejador de Aulas Aurora AI
            </h3>
            <p className="text-xs text-slate-400">Geração inteligente alinhada com a BNCC</p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Disciplina
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Ano / Série
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors"
              >
                {grades.map((gr) => (
                  <option key={gr} value={gr}>
                    {gr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Tema da Aula
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Frações equivalentes, Ciclo da Água, etc."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/80 border border-rose-950 text-rose-300 rounded-xl text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/15 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gerando com Aurora...</span>
              </>
            ) : (
              <>
                <span>Gerar Plano de Aula</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {lessonPlan && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 border border-indigo-500/20 bg-indigo-950/20 rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                  Plano Estruturado BNCC
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Copiar plano"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
                    title="Download como Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-300 overflow-y-auto max-h-56 pr-1 leading-relaxed prose prose-invert prose-xs">
                <Markdown>{lessonPlan}</Markdown>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
