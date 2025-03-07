import dynamic from 'next/dynamic';

export const SanitizeHtmlAsync = dynamic(
  () => import('./SanitizeHtml').then((mod) => mod.SanitizeHtml),
  { ssr: true }
);
