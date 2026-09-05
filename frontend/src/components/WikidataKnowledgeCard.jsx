import { useEffect, useState } from 'react';
import { fetchWikidata } from '../services/wikidataService';
import { useLanguage } from '../context/LanguageContext';

export default function WikidataKnowledgeCard({ name, stateName }) {
  const { isHindi } = useLanguage();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchWikidata(name, stateName)
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [name, stateName]);

  if (loading) {
    return (
      <div className="card p-5 animate-pulse bg-white/60">
        <div className="h-4 w-32 bg-gray-200 rounded mb-3" />
        <div className="h-3 w-48 bg-gray-100 rounded" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="card p-5 border border-indigo-100/60 bg-gradient-to-br from-white/95 to-indigo-50/40 shadow-md">
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {/* Wikidata Barcode Logo Icon */}
          <div className="flex items-center gap-0.5 h-4 w-5">
            <span className="h-full w-1 bg-red-600 rounded-sm" />
            <span className="h-full w-1 bg-green-600 rounded-sm" />
            <span className="h-full w-1 bg-blue-700 rounded-sm" />
          </div>
          <h3 className="text-sm font-bold text-india-navy tracking-tight">
            {isHindi ? 'विकीडेटा ज्ञानकोष' : 'Wikidata Linked Knowledge'}
          </h3>
        </div>
        <a
          href={data.wikidataUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-india-navy hover:underline flex items-center gap-1"
        >
          <span className="font-mono text-gray-500">{data.qid}</span> ↗
        </a>
      </div>

      <p className="mt-3 text-xs text-gray-600 italic">
        "{isHindi && data.description_hi ? data.description_hi : data.description}"
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
        {data.inception && (
          <div className="rounded-lg bg-white/80 p-2 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              {isHindi ? 'स्थापना / निर्माण' : 'Inception / Era'}
            </span>
            <span className="font-semibold text-india-text mt-0.5 block">🏛️ {data.inception}</span>
          </div>
        )}

        {data.unescoId && (
          <div className="rounded-lg bg-white/80 p-2 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              UNESCO World Heritage
            </span>
            <a
              href={data.unescoUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-blue-600 hover:underline mt-0.5 block"
            >
              🇺🇳 Site #{data.unescoId} ↗
            </a>
          </div>
        )}

        {data.commonsCategory && (
          <div className="rounded-lg bg-white/80 p-2 border border-gray-100">
            <span className="text-[10px] uppercase font-bold text-gray-400 block">
              Wikimedia Commons
            </span>
            <a
              href={data.commonsUrl}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-india-green hover:underline mt-0.5 block truncate"
              title={data.commonsCategory}
            >
              📁 {data.commonsCategory} ↗
            </a>
          </div>
        )}
      </div>

      {/* Wikipedia External Reading Links */}
      {(data.enWikipedia || data.hiWikipedia) && (
        <div className="mt-4 pt-3 border-t border-gray-100/80 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-500 font-medium">
            {isHindi ? 'विकिपीडिया लेख:' : 'Wikipedia References:'}
          </span>
          {data.enWikipedia && (
            <a
              href={data.enWikipedia}
              target="_blank"
              rel="noreferrer"
              className="chip bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
            >
              English Wikipedia ↗
            </a>
          )}
          {data.hiWikipedia && (
            <a
              href={data.hiWikipedia}
              target="_blank"
              rel="noreferrer"
              className="chip bg-orange-50 text-orange-700 hover:bg-orange-100 transition"
            >
              हिन्दी विकिपीडिया ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}
