import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';

/* ─── Language list: 70+ languages covering all Indian + world languages ─── */
const LANGUAGES = [
  // ── Indian Languages (22 Scheduled + Popular Regional) ──
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇮🇳', group: 'Indian' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', flag: '🇮🇳', group: 'Indian' },
  { code: 'bn', label: 'Bengali', nativeLabel: 'বাংলা', flag: '🇮🇳', group: 'Indian' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', flag: '🇮🇳', group: 'Indian' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flag: '🇮🇳', group: 'Indian' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', flag: '🇮🇳', group: 'Indian' },
  { code: 'gu', label: 'Gujarati', nativeLabel: 'ગુજરાતી', flag: '🇮🇳', group: 'Indian' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', flag: '🇮🇳', group: 'Indian' },
  { code: 'ml', label: 'Malayalam', nativeLabel: 'മലയാളം', flag: '🇮🇳', group: 'Indian' },
  { code: 'pa', label: 'Punjabi', nativeLabel: 'ਪੰਜਾਬੀ', flag: '🇮🇳', group: 'Indian' },
  { code: 'or', label: 'Odia', nativeLabel: 'ଓଡ଼ିଆ', flag: '🇮🇳', group: 'Indian' },
  { code: 'as', label: 'Assamese', nativeLabel: 'অসমীয়া', flag: '🇮🇳', group: 'Indian' },
  { code: 'ur', label: 'Urdu', nativeLabel: 'اردو', flag: '🇮🇳', group: 'Indian' },
  { code: 'ne', label: 'Nepali', nativeLabel: 'नेपाली', flag: '🇳🇵', group: 'Indian' },
  { code: 'si', label: 'Sinhala', nativeLabel: 'සිංහල', flag: '🇱🇰', group: 'Indian' },
  { code: 'sa', label: 'Sanskrit', nativeLabel: 'संस्कृतम्', flag: '🇮🇳', group: 'Indian' },
  { code: 'mai', label: 'Maithili', nativeLabel: 'मैथिली', flag: '🇮🇳', group: 'Indian' },
  { code: 'sd', label: 'Sindhi', nativeLabel: 'سنڌي', flag: '🇮🇳', group: 'Indian' },
  { code: 'ks', label: 'Kashmiri', nativeLabel: 'कॉशुर', flag: '🇮🇳', group: 'Indian' },
  { code: 'doi', label: 'Dogri', nativeLabel: 'डोगरी', flag: '🇮🇳', group: 'Indian' },
  { code: 'kok', label: 'Konkani', nativeLabel: 'कोंकणी', flag: '🇮🇳', group: 'Indian' },
  { code: 'bho', label: 'Bhojpuri', nativeLabel: 'भोजपुरी', flag: '🇮🇳', group: 'Indian' },
  { code: 'sat', label: 'Santali', nativeLabel: 'ᱥᱟᱱᱛᱟᱲᱤ', flag: '🇮🇳', group: 'Indian' },
  { code: 'mni', label: 'Manipuri', nativeLabel: 'মেইতেই', flag: '🇮🇳', group: 'Indian' },

  // ── East Asian ──
  { code: 'zh-CN', label: 'Chinese (Simplified)', nativeLabel: '中文(简体)', flag: '🇨🇳', group: 'East Asian' },
  { code: 'zh-TW', label: 'Chinese (Traditional)', nativeLabel: '中文(繁體)', flag: '🇹🇼', group: 'East Asian' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語', flag: '🇯🇵', group: 'East Asian' },
  { code: 'ko', label: 'Korean', nativeLabel: '한국어', flag: '🇰🇷', group: 'East Asian' },
  { code: 'mn', label: 'Mongolian', nativeLabel: 'Монгол', flag: '🇲🇳', group: 'East Asian' },
  { code: 'bo', label: 'Tibetan', nativeLabel: 'བོད་སྐད།', flag: '🏔️', group: 'East Asian' },

  // ── Southeast Asian ──
  { code: 'id', label: 'Indonesian', nativeLabel: 'Bahasa Indonesia', flag: '🇮🇩', group: 'Southeast Asian' },
  { code: 'ms', label: 'Malay', nativeLabel: 'Melayu', flag: '🇲🇾', group: 'Southeast Asian' },
  { code: 'th', label: 'Thai', nativeLabel: 'ภาษาไทย', flag: '🇹🇭', group: 'Southeast Asian' },
  { code: 'vi', label: 'Vietnamese', nativeLabel: 'Tiếng Việt', flag: '🇻🇳', group: 'Southeast Asian' },
  { code: 'fil', label: 'Filipino', nativeLabel: 'Filipino', flag: '🇵🇭', group: 'Southeast Asian' },
  { code: 'my', label: 'Burmese', nativeLabel: 'မြန်မာဘာသာ', flag: '🇲🇲', group: 'Southeast Asian' },
  { code: 'km', label: 'Khmer', nativeLabel: 'ភាសាខ្មែរ', flag: '🇰🇭', group: 'Southeast Asian' },
  { code: 'lo', label: 'Lao', nativeLabel: 'ພາສາລາວ', flag: '🇱🇦', group: 'Southeast Asian' },

  // ── Middle Eastern & Central Asian ──
  { code: 'ar', label: 'Arabic', nativeLabel: 'العربية', flag: '🇸🇦', group: 'Middle Eastern' },
  { code: 'fa', label: 'Persian (Farsi)', nativeLabel: 'فارسی', flag: '🇮🇷', group: 'Middle Eastern' },
  { code: 'tr', label: 'Turkish', nativeLabel: 'Türkçe', flag: '🇹🇷', group: 'Middle Eastern' },
  { code: 'he', label: 'Hebrew', nativeLabel: 'עברית', flag: '🇮🇱', group: 'Middle Eastern' },
  { code: 'az', label: 'Azerbaijani', nativeLabel: 'Azərbaycan', flag: '🇦🇿', group: 'Middle Eastern' },
  { code: 'uz', label: 'Uzbek', nativeLabel: 'O\'zbek', flag: '🇺🇿', group: 'Middle Eastern' },
  { code: 'kk', label: 'Kazakh', nativeLabel: 'Қазақ', flag: '🇰🇿', group: 'Middle Eastern' },
  { code: 'ps', label: 'Pashto', nativeLabel: 'پښتو', flag: '🇦🇫', group: 'Middle Eastern' },

  // ── European ──
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷', group: 'European' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', flag: '🇪🇸', group: 'European' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch', flag: '🇩🇪', group: 'European' },
  { code: 'pt', label: 'Portuguese', nativeLabel: 'Português', flag: '🇧🇷', group: 'European' },
  { code: 'ru', label: 'Russian', nativeLabel: 'Русский', flag: '🇷🇺', group: 'European' },
  { code: 'it', label: 'Italian', nativeLabel: 'Italiano', flag: '🇮🇹', group: 'European' },
  { code: 'pl', label: 'Polish', nativeLabel: 'Polski', flag: '🇵🇱', group: 'European' },
  { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands', flag: '🇳🇱', group: 'European' },
  { code: 'uk', label: 'Ukrainian', nativeLabel: 'Українська', flag: '🇺🇦', group: 'European' },
  { code: 'el', label: 'Greek', nativeLabel: 'Ελληνικά', flag: '🇬🇷', group: 'European' },
  { code: 'sv', label: 'Swedish', nativeLabel: 'Svenska', flag: '🇸🇪', group: 'European' },
  { code: 'da', label: 'Danish', nativeLabel: 'Dansk', flag: '🇩🇰', group: 'European' },
  { code: 'fi', label: 'Finnish', nativeLabel: 'Suomi', flag: '🇫🇮', group: 'European' },
  { code: 'no', label: 'Norwegian', nativeLabel: 'Norsk', flag: '🇳🇴', group: 'European' },
  { code: 'ro', label: 'Romanian', nativeLabel: 'Română', flag: '🇷🇴', group: 'European' },
  { code: 'hu', label: 'Hungarian', nativeLabel: 'Magyar', flag: '🇭🇺', group: 'European' },
  { code: 'cs', label: 'Czech', nativeLabel: 'Čeština', flag: '🇨🇿', group: 'European' },
  { code: 'sk', label: 'Slovak', nativeLabel: 'Slovenčina', flag: '🇸🇰', group: 'European' },
  { code: 'hr', label: 'Croatian', nativeLabel: 'Hrvatski', flag: '🇭🇷', group: 'European' },
  { code: 'sr', label: 'Serbian', nativeLabel: 'Српски', flag: '🇷🇸', group: 'European' },
  { code: 'bg', label: 'Bulgarian', nativeLabel: 'Български', flag: '🇧🇬', group: 'European' },
  { code: 'ca', label: 'Catalan', nativeLabel: 'Català', flag: '🇪🇸', group: 'European' },

  // ── African ──
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', flag: '🇰🇪', group: 'African' },
  { code: 'am', label: 'Amharic', nativeLabel: 'አማርኛ', flag: '🇪🇹', group: 'African' },
  { code: 'ha', label: 'Hausa', nativeLabel: 'Hausa', flag: '🇳🇬', group: 'African' },
  { code: 'yo', label: 'Yoruba', nativeLabel: 'Yorùbá', flag: '🇳🇬', group: 'African' },
  { code: 'ig', label: 'Igbo', nativeLabel: 'Igbo', flag: '🇳🇬', group: 'African' },
  { code: 'zu', label: 'Zulu', nativeLabel: 'isiZulu', flag: '🇿🇦', group: 'African' },
  { code: 'af', label: 'Afrikaans', nativeLabel: 'Afrikaans', flag: '🇿🇦', group: 'African' },
  { code: 'so', label: 'Somali', nativeLabel: 'Soomaali', flag: '🇸🇴', group: 'African' },

  // ── Americas ──
  { code: 'pt-BR', label: 'Portuguese (Brazil)', nativeLabel: 'Português (Brasil)', flag: '🇧🇷', group: 'Americas' },
  { code: 'es-MX', label: 'Spanish (Mexico)', nativeLabel: 'Español (México)', flag: '🇲🇽', group: 'Americas' },
  { code: 'ht', label: 'Haitian Creole', nativeLabel: 'Kreyòl ayisyen', flag: '🇭🇹', group: 'Americas' },
];

/* ─── Inject Google Translate widget script ──────────────────────────────── */
function loadGoogleTranslate(targetLang) {
  // Remove any existing GT cookie first so language applies cleanly
  document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + window.location.hostname;
  if (targetLang !== 'en') {
    document.cookie = `googtrans=/en/${targetLang}; path=/`;
    document.cookie = `googtrans=/en/${targetLang}; path=/; domain=${window.location.hostname}`;
  }

  const existingEl = document.getElementById('gt-translate-el');
  if (existingEl) existingEl.remove();

  const existingScript = document.getElementById('gt-script');
  if (existingScript) existingScript.remove();

  // GT element (hidden)
  const el = document.createElement('div');
  el.id = 'gt-translate-el';
  el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden;';
  document.body.appendChild(el);

  window.googleTranslateElementInit = function () {
    // eslint-disable-next-line no-new, no-undef
    new window.google.translate.TranslateElement(
      { pageLanguage: 'en', autoDisplay: false },
      'gt-translate-el'
    );
  };

  const script = document.createElement('script');
  script.id = 'gt-script';
  script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage(); // existing EN/HI context
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(lang === 'hi' ? 'hi' : 'en');
  const [search, setSearch] = useState('');
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = useCallback((code) => {
    setSelected(code);
    setOpen(false);
    setSearch('');

    // Keep existing Hindi/English context toggle working
    if (code === 'hi') setLang('hi');
    else setLang('en');

    // Use Google Translate for everything else (and also for hi)
    loadGoogleTranslate(code);
  }, [setLang]);

  const filtered = LANGUAGES.filter(l =>
    l.label.toLowerCase().includes(search.toLowerCase()) ||
    (l.nativeLabel && l.nativeLabel.toLowerCase().includes(search.toLowerCase())) ||
    l.code.toLowerCase().includes(search.toLowerCase())
  );
  const groups = ['Indian', 'East Asian', 'Southeast Asian', 'Middle Eastern', 'European', 'African', 'Americas'];

  const current = LANGUAGES.find(l => l.code === selected) || LANGUAGES[0];

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-india-navy hover:bg-india-navy/5 transition-all duration-200 shadow-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change language"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.code.toUpperCase()}</span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-[999] mt-2 w-72 rounded-2xl border border-gray-100 bg-white shadow-2xl overflow-hidden animate-fade-slide-up"
          role="listbox"
        >
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              placeholder="🔍  Search language..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-india-navy transition"
              autoFocus
            />
          </div>

          <div className="max-h-72 overflow-y-auto">
            {groups.map(group => {
              const items = filtered.filter(l => l.group === group);
              if (!items.length) return null;
              return (
                <div key={group}>
                  <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    {group === 'Indian' ? '🇮🇳 Indian Languages'
                     : group === 'East Asian' ? '🌏 East Asian'
                     : group === 'Southeast Asian' ? '🌴 Southeast Asian'
                     : group === 'Middle Eastern' ? '🕌 Middle Eastern & Central Asian'
                     : group === 'European' ? '🌍 European'
                     : group === 'African' ? '🌍 African'
                     : '🌎 Americas'}
                  </p>
                  {items.map(l => (
                    <button
                      key={l.code}
                      type="button"
                      role="option"
                      aria-selected={l.code === selected}
                      onClick={() => handleSelect(l.code)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${
                        l.code === selected
                          ? 'bg-india-navy text-white'
                          : 'hover:bg-india-navy/5 text-india-text'
                      }`}
                    >
                      <span className="text-base">{l.flag}</span>
                      <span className="flex-1">
                        <span className="block text-xs font-medium">{l.label}</span>
                        {l.nativeLabel && l.nativeLabel !== l.label && (
                          <span className="block text-[10px] opacity-70">{l.nativeLabel}</span>
                        )}
                      </span>
                      <span className="text-[10px] opacity-50 uppercase">{l.code}</span>
                      {l.code === selected && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M2 7l3.5 3.5L12 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 px-3 py-2 text-center text-[10px] text-gray-400">
            🌐 Powered by Google Translate · {LANGUAGES.length} languages
          </div>
        </div>
      )}
    </div>
  );
}
