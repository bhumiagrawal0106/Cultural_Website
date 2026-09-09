import { useEffect, useState } from 'react';
import { placeholderImage, getStateThumbnail } from '../utils/catalog';

/** Map of broad subject keywords to curated, verified Unsplash photo fallbacks */
/** Map of broad subject keywords to curated, verified Unsplash photo fallbacks */
const SUBJECT_FALLBACKS = {
  fort: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&q=80', // Authentic Indian Fort (Gwalior Fort)
  temple: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80', // Meenakshi / South Indian temple
  monument: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80', // Taj Mahal / Historic monument
  palace: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80', // Hawa Mahal, Jaipur
  food: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=800&q=80', // Indian Thali & authentic food
  craft: 'https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=800&q=80', // Indian handicrafts & sculptures
  tradition: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80', // Indian culture, rituals & celebrations
  festival: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80', // Indian festival & diya
  dance: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80', // Classical Indian dance
  lake: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80', // Dal Lake, Kashmir
  beach: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', // Goa Beach
  mountain: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', // Himalayas
  waterfall: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', // Indian waterfalls
  gurudwara: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80', // Golden Temple Amritsar
  dargah: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80', // Historic Mughal Architecture
  church: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80', // Historic Church
  india: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80', // India Heritage
};

const KEYWORD_RULES = [
  { keys: ['fort', 'qila', 'kila', 'garh', 'दुर्ग', 'किला', 'क़िला', 'गढ़'], target: 'fort' },
  { keys: ['temple', 'mandir', 'devalaya', 'shrine', 'मंदिर', 'मन्दिर', 'धाम'], target: 'temple' },
  { keys: ['gurudwara', 'gurdwara', 'गुरुद्वारा'], target: 'gurudwara' },
  { keys: ['dargah', 'mosque', 'masjid', 'दरगाह', 'मस्जिद'], target: 'dargah' },
  { keys: ['church', 'basilica', 'गिरजाघर', 'चर्च'], target: 'church' },
  { keys: ['palace', 'mahal', 'haveli', 'महल', 'हवेली'], target: 'palace' },
  { keys: ['food', 'cuisine', 'dish', 'thali', 'curry', 'roti', 'sweet', 'mithai', 'खाना', 'भोजन', 'व्यंजन', 'स्वाद', 'मिठाई'], target: 'food' },
  { keys: ['craft', 'handicraft', 'weaving', 'sari', 'saree', 'art', 'pottery', 'कला', 'शिल्प', 'हस्तशिल्प', 'हथकरघा'], target: 'craft' },
  { keys: ['tradition', 'ritual', 'ceremony', 'custom', 'परंपरा', 'संस्कृति', 'रीति'], target: 'tradition' },
  { keys: ['festival', 'utsav', 'mela', 'fair', 'त्योहार', 'उत्सव', 'मेला', 'दीवाली', 'होली'], target: 'festival' },
  { keys: ['dance', 'nritya', 'kathak', 'folk', 'नृत्य', 'नाच', 'गरबा'], target: 'dance' },
  { keys: ['lake', 'talab', 'sarovar', 'river', 'झील', 'तालाब', 'सरोवर', 'नदी'], target: 'lake' },
  { keys: ['beach', 'sea', 'coast', 'ocean', 'समुद्र', 'तट'], target: 'beach' },
  { keys: ['waterfall', 'falls', 'fall', 'झरना', 'जलप्रपात'], target: 'waterfall' },
  { keys: ['mountain', 'hill', 'valley', 'pass', 'peak', 'himalaya', 'पर्वत', 'पहाड़', 'घाटी'], target: 'mountain' },
  { keys: ['monument', 'heritage', 'gate', 'pillar', 'stupa', 'स्मारक', 'धरोहर', 'स्तूप'], target: 'monument' },
];

function getSubjectFallback(text = '') {
  const lower = (text || '').toLowerCase();
  // Check if text matches a state name or slug
  const stateMatch = getStateThumbnail(lower);
  if (stateMatch) return stateMatch;

  for (const rule of KEYWORD_RULES) {
    for (const k of rule.keys) {
      if (lower.includes(k.toLowerCase())) {
        return SUBJECT_FALLBACKS[rule.target];
      }
    }
  }

  return SUBJECT_FALLBACKS.india;
}

/**
 * <img> that swaps through:
 *   1. src (original Wikimedia/CDN url)
 *   2. State or subject-matched verified photo
 *   3. Branded placeholder as absolute final safeguard
 */
export default function SafeImage({ src, alt, fallbackText, className = '', style, ...rest }) {
  const identifier = fallbackText || alt || '';
  const stateInitial = getStateThumbnail(identifier);
  const initialSrc = src || stateInitial || getSubjectFallback(identifier);
  const [current, setCurrent] = useState(initialSrc);
  const [tried, setTried] = useState([]);

  useEffect(() => {
    const updatedInitial = src || getStateThumbnail(identifier) || getSubjectFallback(identifier);
    setCurrent(updatedInitial);
    setTried([]);
  }, [src, identifier]);

  function handleError() {
    const triedSet = new Set(tried);
    triedSet.add(current);

    // 1. Try state thumbnail first if available
    const stateImg = getStateThumbnail(identifier);
    if (stateImg && !triedSet.has(stateImg)) {
      setTried([...triedSet]);
      setCurrent(stateImg);
      return;
    }

    // 2. Try subject keyword fallback
    const subjectUrl = getSubjectFallback(identifier);
    if (subjectUrl && !triedSet.has(subjectUrl)) {
      setTried([...triedSet]);
      setCurrent(subjectUrl);
      return;
    }

    // 3. Fallback to India heritage general photo before placeholder
    if (!triedSet.has(SUBJECT_FALLBACKS.india)) {
      setTried([...triedSet]);
      setCurrent(SUBJECT_FALLBACKS.india);
      return;
    }

    // 4. Final: branded placeholder
    const branded = placeholderImage(identifier);
    if (!triedSet.has(branded)) {
      setCurrent(branded);
    }
  }

  return (
    <img
      src={current}
      alt={alt || ''}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  );
}
