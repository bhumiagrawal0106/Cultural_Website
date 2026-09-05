import { useLanguage } from '../../context/LanguageContext';

export default function Spinner({ className = '', size = 'md', label }) {
  const { ui } = useLanguage();
  const dims = size === 'sm' ? 'h-5 w-5 border-2' : size === 'lg' ? 'h-14 w-14 border-4' : 'h-9 w-9 border-[3px]';
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-10 ${className}`} role="status" aria-live="polite">
      <div className={`${dims} animate-spin rounded-full border-india-orange border-t-transparent`} />
      <span className="text-sm text-gray-500">{label || ui('loading')}</span>
    </div>
  );
}
