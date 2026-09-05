import { useEffect, useState } from 'react';
import { fetchInheritageAIContext, generateRegistryRecord } from '../services/inheritageService';
import { useLanguage } from '../context/LanguageContext';

export default function InheritageSection({ name, slug, item = {}, state = null }) {
  const { isHindi } = useLanguage();
  const [record, setRecord] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);
  const [idCopied, setIdCopied] = useState(false);

  useEffect(() => {
    const rec = generateRegistryRecord(slug, {
      name,
      stateName: state ? (state.name_en || state.name) : 'India',
      type: item.type || 'heritage',
      lat: item.coordinates?.lat,
      lng: item.coordinates?.lng
    });
    setRecord(rec);
  }, [slug, name, item, state]);

  if (!record) return null;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(record.jsonLd, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(record.registryId);
    setIdCopied(true);
    setTimeout(() => setIdCopied(false), 2000);
  };

  return (
    <section className="mt-10 rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/60 p-5 sm:p-7 shadow-sm transition-all">
      {/* Header with Verified Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200/80">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white shadow-md text-2xl">
            🏛️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-india-navy">
                {isHindi ? 'इनहेरिटेज फाउंडेशन ओपन रजिस्ट्री' : 'Inheritage Foundation Open Registry'}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
                {isHindi ? 'सत्यापित अभिलेख' : 'Verified Record'}
              </span>
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              {isHindi
                ? 'मुक्त सांस्कृतिक विरासत मानक (OHPS-v1.4) एवं 5,000+ प्रलेखित भारतीय धरोहर'
                : "India's Open Cultural Preservation Standard (OHPS-v1.4) & Public Dataset"}
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowJson((prev) => !prev)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3.5 py-1.5 text-xs font-bold text-amber-900 shadow-sm hover:bg-amber-100/70 transition"
          >
            <span>{showJson ? '✕' : '{ }'}</span>
            {showJson ? (isHindi ? 'बंद करें' : 'Hide JSON-LD') : (isHindi ? 'JSON-LD देखें' : 'Inspect JSON-LD')}
          </button>
        </div>
      </div>

      {/* Registry Meta Grid */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Record ID */}
        <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {isHindi ? 'रजिस्ट्री पहचान (ID)' : 'Registry Identifier'}
          </span>
          <div className="mt-1 flex items-center justify-between gap-1">
            <code className="font-mono text-xs font-extrabold text-india-navy truncate">
              {record.registryId}
            </code>
            <button
              type="button"
              onClick={handleCopyId}
              title="Copy Registry ID"
              className="shrink-0 rounded p-1 text-[11px] font-semibold text-amber-700 hover:bg-amber-100 transition"
            >
              {idCopied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        {/* Classification */}
        <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {isHindi ? 'संरक्षण श्रेणी' : 'Conservation Grade'}
          </span>
          <p className="mt-1 text-xs font-bold text-gray-800 line-clamp-1">
            {record.conservationGrade}
          </p>
        </div>

        {/* Architecture / Style */}
        <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {isHindi ? 'वास्तुकला / कालखंड' : 'Architecture & Era'}
          </span>
          <p className="mt-1 text-xs font-bold text-gray-800 line-clamp-1">
            {record.architecturalStyle}
          </p>
        </div>

        {/* AI Vector */}
        <div className="rounded-xl border border-amber-200/80 bg-white/90 p-3 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {isHindi ? 'सिमेंटिक एम्बेडिंग' : 'AI Semantic Vector'}
          </span>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="rounded-md bg-indigo-100 px-1.5 py-0.5 text-[10px] font-extrabold text-indigo-800">
              {record.aiVector.dimensions}-dim
            </span>
            <span className="text-[11px] text-gray-600 truncate">
              text-embedding-3
            </span>
          </div>
        </div>
      </div>

      {/* AI Context & Semantic Summary */}
      <div className="mt-4 rounded-xl border border-amber-200 bg-white/90 p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
          <span>🤖</span>
          <span>{isHindi ? 'एआई संदर्भ व प्रलेखित विवरण' : 'Preservation Record & AI Retrieval Context'}</span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-gray-700">
          {record.context}
        </p>
      </div>

      {/* JSON-LD Inspector Panel (Toggled) */}
      {showJson && (
        <div className="mt-4 rounded-xl border border-gray-800 bg-gray-900 p-4 text-emerald-400 font-mono text-xs shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-gray-800 mb-2">
            <span className="text-gray-400 font-sans font-bold text-[11px]">
              Schema.org Linked Open Data (JSON-LD)
            </span>
            <button
              type="button"
              onClick={handleCopyJson}
              className="rounded bg-gray-800 px-2.5 py-1 text-[11px] text-white hover:bg-gray-700 transition"
            >
              {copied ? '✓ Copied' : 'Copy JSON'}
            </button>
          </div>
          <pre className="overflow-x-auto p-1 leading-normal max-h-60 scrollbar-thin">
            {JSON.stringify(record.jsonLd, null, 2)}
          </pre>
        </div>
      )}

      {/* Official Registry Cross-References & CC BY Citation */}
      <div className="mt-4 pt-3 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold text-gray-700">
            {isHindi ? 'राष्ट्रीय संबद्धता:' : 'Official Registry Portals:'}
          </span>
          {record.officialRegistries.map((reg) => (
            <a
              key={reg.name}
              href={reg.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-white border border-gray-200 px-2 py-1 text-[11px] font-medium text-gray-700 hover:text-india-navy hover:border-india-navy transition"
            >
              <span>{reg.name}</span>
              <span className="text-[9px] text-gray-400">↗</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={record.licenseUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-amber-900 underline hover:text-amber-700"
          >
            <span>License: CC BY 4.0</span>
            <span className="text-[10px]">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
