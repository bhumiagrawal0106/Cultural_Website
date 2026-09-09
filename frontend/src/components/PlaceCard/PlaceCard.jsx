import { Link } from 'react-router-dom';
import SafeImage from '../SafeImage';
import { useLanguage } from '../../context/LanguageContext';
import { COLLECTION_LABEL, itemLink, typeIcon, typeLabel } from '../../utils/catalog';

/**
 * Card for a place, craft, tradition or food item.
 * @param item     document from the API
 * @param collection 'places' | 'crafts' | 'traditions' | 'food'
 */
export default function PlaceCard({ item, collection = 'places', action }) {
  const { pick, pickTuple } = useLanguage();
  const name = pick(item, 'name');
  const description = pick(item, 'description');
  const image = item.images && item.images[0];
  const badge = collection === 'places' ? typeLabel(item.type) : COLLECTION_LABEL[collection];
  const icon = collection === 'places' ? typeIcon(item.type) : '';
  const stateName = item.stateId && item.stateId.name_en ? pick(item.stateId, 'name') : '';

  return (
    <article className="card group flex h-full flex-col transition hover:-translate-y-1 hover:shadow-lg">
      <Link to={itemLink(collection, item._id)} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          <SafeImage
            src={image}
            alt={name}
            fallbackText={name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span className="chip absolute left-3 top-3 bg-white/95 text-india-navy shadow-sm">
            {icon && <span className="mr-1" aria-hidden="true">{icon}</span>}
            {pickTuple(badge)}
          </span>
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={itemLink(collection, item._id)} className="block">
          <h3 className="text-lg font-bold leading-snug text-india-text group-hover:text-india-navy">{name}</h3>
        </Link>
        {stateName && <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-india-green">{stateName}</p>}
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-gray-600">{description}</p>
        {action && <div className="mt-4">{action}</div>}
      </div>
    </article>
  );
}
