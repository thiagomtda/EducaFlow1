// Metadata para PWA (EducaFlow) conforme especificações
export default function manifest() {
  return {
    name: 'EducaFlow - Diário de Classe & Planejador BNCC',
    short_name: 'EducaFlow',
    description: 'Plataforma Tátil e Offline-First para Professores do Ensino Fundamental I',
    start_url: '/',
    display: 'standalone' as const,
    background_color: '#f8fafc',
    theme_color: '#4f46e5',
    orientation: 'portrait' as const,
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
