import { useState, useEffect } from 'react';
import {
  formatSocialCount,
  isItemLiked,
  toggleLike,
  recordView,
} from '../services/interactionService';
import { useLanguage } from '../context/LanguageContext';
import { useYatra } from '../context/YatraContext';

export default function SocialEngagement({
  item = {},
  collection = 'places',
  variant = 'card', // 'card' | 'detail'
  className = '',
}) {
  const { isHindi } = useLanguage();
  const { isInYatra, toggleYatra } = useYatra();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likesCount || 0);
  const [viewCount, setViewCount] = useState(item.viewCount || 0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (item._id) {
      setLiked(isItemLiked(item._id));
      setLikesCount(item.likesCount || 0);
      setViewCount(item.viewCount || 0);
    }
  }, [item._id, item.likesCount, item.viewCount]);

  const handleLikeClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const previousLiked = liked;
    const previousCount = likesCount;

    // Trigger instant optimistic UI update
    setLiked(!previousLiked);
    setLikesCount(previousLiked ? Math.max(0, previousCount - 1) : previousCount + 1);
    setAnimating(true);
    setTimeout(() => setAnimating(false), 400);

    const result = await toggleLike(collection, item._id, previousLiked);
    if (result && result.likesCount !== undefined) {
      setLikesCount(result.likesCount);
    }
  };

  const inYatra = item._id ? isInYatra(item._id) : false;
  const handleYatraClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleYatra(item, collection);
  };

  // Card Variant: Compact social pills for list and grid cards
  if (variant === 'card') {
    return (
      <div
        className={`flex items-center justify-between gap-2 border-t border-gray-100 pt-3 text-xs text-gray-500 ${className}`}
      >
        {/* Views */}
        <div className="flex items-center gap-1.5 font-medium text-gray-500" title={`${viewCount} views`}>
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <span>{formatSocialCount(viewCount)}</span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Yatra Planner Button */}
          <button
            type="button"
            onClick={handleYatraClick}
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold transition ${
              inYatra
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-gray-50 text-gray-600 hover:bg-amber-50 hover:text-amber-800'
            }`}
            title={inYatra ? 'Remove from My Yatra' : 'Add to My Yatra Itinerary Planner'}
          >
            <span>{inYatra ? '✓' : '+'}</span>
            <span>{isHindi ? 'यात्रा' : 'Yatra'}</span>
          </button>

          {/* Like Button */}
          <button
            type="button"
            onClick={handleLikeClick}
            aria-label={liked ? 'Unlike' : 'Like'}
            className={`group/like flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold transition-all duration-200 ${
              liked
                ? 'bg-rose-50 text-rose-600 shadow-xs'
                : 'bg-gray-50 text-gray-600 hover:bg-rose-50 hover:text-rose-500'
            }`}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-200 ${
                animating ? 'scale-125' : 'scale-100'
              } ${liked ? 'fill-rose-500 text-rose-500' : 'fill-none text-gray-400 group-hover/like:text-rose-500'}`}
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{formatSocialCount(likesCount)}</span>
          </button>
        </div>
      </div>
    );
  }

  // Detail Variant: Full Social Engagement Toolbar for ItemDetail
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {/* Interactive Like Button */}
      <button
        type="button"
        onClick={handleLikeClick}
        className={`group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition-all duration-200 ${
          liked
            ? 'bg-rose-500 text-white shadow-rose-500/25 ring-2 ring-rose-500/20'
            : 'border border-gray-200 bg-white text-gray-700 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-600'
        }`}
      >
        <svg
          className={`h-5 w-5 transition-transform duration-300 ${
            animating ? 'scale-130' : 'scale-100'
          } ${liked ? 'fill-white text-white' : 'fill-none text-gray-500 group-hover:text-rose-500'}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>
          {likesCount.toLocaleString()}{' '}
          <span className="font-normal opacity-90">{isHindi ? 'पसंद' : 'Likes'}</span>
        </span>
      </button>

      {/* Yatra Planner Button */}
      <button
        type="button"
        onClick={handleYatraClick}
        className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold shadow-xs transition ${
          inYatra
            ? 'bg-amber-500 text-white shadow-amber-500/25 ring-2 ring-amber-500/20'
            : 'border border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50/50 hover:text-amber-800'
        }`}
      >
        <span>{inYatra ? '✓' : '🧭'}</span>
        <span>{inYatra ? (isHindi ? 'मेरी यात्रा में शामिल' : 'In My Yatra') : (isHindi ? 'यात्रा में जोड़ें' : '+ Add to Yatra')}</span>
      </button>

      {/* View Counter Badge */}
      <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50/80 px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-xs">
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <span>
          {viewCount.toLocaleString()}{' '}
          <span className="font-normal text-gray-500">{isHindi ? 'देखा गया' : 'Views'}</span>
        </span>
      </div>
    </div>
  );
}
