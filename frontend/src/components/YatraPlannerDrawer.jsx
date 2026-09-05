import { useState, useEffect } from 'react';
import { useYatra } from '../context/YatraContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { itemLink } from '../utils/catalog';
import {
  MAJOR_HUBS,
  calculateHaversineDistance,
  getTransitRecommendations,
} from '../utils/transitPlanner';

export default function YatraPlannerDrawer() {
  const { isHindi } = useLanguage();
  const { yatra, isDrawerOpen, setIsDrawerOpen, removeFromYatra, clearYatra } = useYatra();

  // User's Starting Location (Default: New Delhi)
  const [userCity, setUserCity] = useState(() => {
    return localStorage.getItem('bharat_yatra_user_city') || 'New Delhi';
  });
  const [userCoords, setUserCoords] = useState(() => {
    try {
      const saved = localStorage.getItem('bharat_yatra_user_coords');
      return saved ? JSON.parse(saved) : { lat: 28.6139, lng: 77.2090 };
    } catch (e) {
      return { lat: 28.6139, lng: 77.2090 };
    }
  });
  const [locating, setLocating] = useState(false);
  const [gpsError, setGpsError] = useState('');

  useEffect(() => {
    localStorage.setItem('bharat_yatra_user_city', userCity);
    localStorage.setItem('bharat_yatra_user_coords', JSON.stringify(userCoords));
  }, [userCity, userCoords]);

  // Handle GPS location detection
  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      return;
    }

    setLocating(true);
    setGpsError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserCoords({ lat: latitude, lng: longitude });

        // Find closest major Indian hub
        let closest = MAJOR_HUBS[0];
        let minDist = Infinity;

        MAJOR_HUBS.forEach((hub) => {
          const d = calculateHaversineDistance(latitude, longitude, hub.lat, hub.lng);
          if (d < minDist) {
            minDist = d;
            closest = hub;
          }
        });

        setUserCity(minDist < 60 ? closest.city : `My Location (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`);
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setGpsError('Unable to retrieve location. Please select a city manually.');
      },
      { timeout: 8000 }
    );
  };

  const handleCitySelect = (e) => {
    const selectedCity = e.target.value;
    setUserCity(selectedCity);
    const hub = MAJOR_HUBS.find((h) => h.city === selectedCity);
    if (hub) {
      setUserCoords({ lat: hub.lat, lng: hub.lng });
    }
  };

  if (!isDrawerOpen) return null;

  // Compute transit plans from user location to first stop and between stops
  let totalDistanceKm = 0;
  const transitLegs = [];

  if (yatra.length > 0) {
    // Leg 1: User's location -> First stop
    const firstStop = yatra[0];
    const destCoords = firstStop.coordinates || { lat: 27.1751, lng: 78.0421 };
    const distToFirst = calculateHaversineDistance(
      userCoords.lat,
      userCoords.lng,
      destCoords.lat,
      destCoords.lng
    );
    totalDistanceKm += distToFirst;
    transitLegs.push(getTransitRecommendations(userCity, firstStop.stateName || firstStop.name_en, distToFirst));

    // Subsequent legs: stop i -> stop i+1
    for (let i = 0; i < yatra.length - 1; i++) {
      const fromStop = yatra[i];
      const toStop = yatra[i + 1];
      const c1 = fromStop.coordinates || { lat: 27.1751, lng: 78.0421 };
      const c2 = toStop.coordinates || { lat: 26.9124, lng: 75.7873 };
      const legDist = calculateHaversineDistance(c1.lat, c1.lng, c2.lat, c2.lng);
      totalDistanceKm += legDist;
      transitLegs.push(getTransitRecommendations(fromStop.stateName || fromStop.name_en, toStop.stateName || toStop.name_en, legDist));
    }
  }

  // Google Maps multi-destination routing URL
  const gmapsRouteUrl = yatra.length > 0
    ? `https://www.google.com/maps/dir/${encodeURIComponent(userCity + ' India')}/${yatra
        .map((s) => encodeURIComponent(`${s.name_en} ${s.stateName} India`))
        .join('/')}`
    : '#';

  const totalEstimatedHours = (yatra.length * 2.5 + totalDistanceKm / 60).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-lg bg-white shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl" aria-hidden="true">🧭</span>
              <div>
                <h3 className="text-lg font-black text-india-navy">
                  {isHindi ? 'मेरी सांस्कृतिक यात्रा योजना' : 'Smart Heritage Yatra Planner'}
                </h3>
                <p className="text-xs text-gray-500">
                  {yatra.length} {isHindi ? 'स्थल नियोजित' : 'destinations with live transit'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="rounded-full p-2 text-gray-400 hover:bg-white hover:text-gray-700 transition"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* User Starting Location Bar */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-100">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <span>📍</span>
                <span>{isHindi ? 'आपकी प्रस्थान स्थिति (कहाँ से शुरू कर रहे हैं?)' : 'Your Departure Location (Starting Point)'}</span>
              </label>
              <button
                type="button"
                onClick={handleDetectGPS}
                disabled={locating}
                className="text-[11px] font-bold text-india-orange hover:underline flex items-center gap-1"
              >
                {locating ? 'Detecting...' : '🎯 Use GPS Location'}
              </button>
            </div>

            <div className="flex gap-2">
              <select
                value={userCity}
                onChange={handleCitySelect}
                className="flex-1 rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs font-bold text-gray-800 shadow-2xs focus:border-india-orange focus:ring-1 focus:ring-india-orange"
              >
                <option value={userCity}>{userCity}</option>
                <optgroup label="Major Indian Hubs">
                  {MAJOR_HUBS.map((h) => (
                    <option key={h.city} value={h.city}>
                      {h.city} ({h.state})
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {gpsError && <p className="text-[11px] text-red-500 mt-1">{gpsError}</p>}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5">
            {yatra.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <span className="text-5xl mb-3">🧭</span>
                <h4 className="text-base font-bold text-gray-800">
                  {isHindi ? 'आपकी यात्रा खाली है' : 'Your Yatra is Empty'}
                </h4>
                <p className="mt-1 text-xs text-gray-500 max-w-xs leading-relaxed">
                  {isHindi
                    ? 'किसी भी स्मारक या स्थल कार्ड पर "+ यात्रा" बटन दबाकर अपना व्यक्तिगत भ्रमण मार्ग तैयार करें।'
                    : 'Tap the "+ Yatra" button on any monument, temple, fort, or craft to build your tailored travel route.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="mt-5 rounded-xl bg-india-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-opacity-90 transition"
                >
                  {isHindi ? 'स्मारक खोजें' : 'Browse Heritage Sites'}
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Distance & Transit Overview Banner */}
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-500 to-india-orange p-4 text-white shadow-md">
                  <div className="flex items-center justify-between text-xs font-bold opacity-90 mb-1">
                    <span>🗺️ {isHindi ? 'कुल दूरी व अवधि' : 'Total Route Metrics'}</span>
                    <span>{yatra.length} Landmarks</span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-2xl font-black">~{totalDistanceKm} km</span>
                    <span className="text-xs opacity-90">• ~{totalEstimatedHours} hrs total journey</span>
                  </div>
                  <p className="text-[11px] opacity-85 mt-2 leading-relaxed">
                    {isHindi
                      ? `${userCity} से प्रारंभ होकर ${yatra.length} ऐतिहासिक स्थलों तक ट्रेन, बस और हवाई जहाज यात्रा विकल्प उपलब्ध हैं।`
                      : `Starting from ${userCity} across ${yatra.length} heritage destinations with verified train, bus, and flight connections.`}
                  </p>
                </div>

                {/* Timeline with Transit Legs */}
                <div className="relative pl-6 space-y-5 border-l-2 border-dashed border-amber-300 ml-3 mt-4">
                  {/* Step 0: User's Departure Origin */}
                  <div className="relative">
                    <span className="absolute -left-[33px] top-1.5 h-6 w-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      📍
                    </span>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 shadow-2xs">
                      <p className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">
                        {isHindi ? 'प्रस्थान बिंदु' : 'Departure Point'}
                      </p>
                      <h4 className="font-bold text-xs text-emerald-950 mt-0.5">{userCity}</h4>
                    </div>
                  </div>

                  {/* Stops and Transit Connectors */}
                  {yatra.map((stop, idx) => {
                    const transit = transitLegs[idx];

                    return (
                      <div key={stop._id} className="space-y-3">
                        {/* Transit Leg Recommendation Card */}
                        {transit && (
                          <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3 text-xs shadow-2xs space-y-2">
                            <div className="flex items-center justify-between text-blue-900 font-bold text-[11px]">
                              <span className="flex items-center gap-1.5">
                                <span>🚀</span>
                                <span>Transit Leg {idx + 1} ({transit.summary})</span>
                              </span>
                            </div>

                            {/* Mode Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                              {transit.modes.map((mode) => (
                                <a
                                  key={mode.name}
                                  href={mode.bookUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group flex flex-col justify-between rounded-lg border border-blue-200/80 bg-white p-2 hover:border-blue-400 hover:shadow-xs transition"
                                >
                                  <div>
                                    <span className="font-bold text-[11px] text-gray-800 flex items-center gap-1">
                                      <span>{mode.icon}</span>
                                      <span className="truncate">{mode.name}</span>
                                    </span>
                                    <p className="text-[10px] text-gray-500 mt-0.5">Duration: {mode.duration}</p>
                                  </div>
                                  <span className="mt-1 text-[10px] font-bold text-blue-600 group-hover:underline">
                                    {mode.bookLabel}
                                  </span>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Landmark Stop Card */}
                        <div className="relative group">
                          <span className="absolute -left-[33px] top-3.5 h-6 w-6 rounded-full bg-india-orange text-white flex items-center justify-center text-xs font-bold shadow-xs">
                            {idx + 1}
                          </span>

                          <div className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-xs hover:border-amber-300 transition flex gap-3 items-center">
                            {stop.image && (
                              <img
                                src={stop.image}
                                alt={stop.name_en}
                                className="h-14 w-14 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <Link
                                to={itemLink(stop.collection, stop._id)}
                                onClick={() => setIsDrawerOpen(false)}
                                className="block font-bold text-xs text-gray-900 hover:text-india-navy truncate"
                              >
                                {stop.name_en}
                              </Link>
                              <p className="text-[11px] text-gray-500 truncate">
                                {stop.stateName} • <span className="capitalize">{stop.type}</span>
                              </p>
                              <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                                ⏱️ ~2–3 hrs visit time
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromYatra(stop._id)}
                              className="text-gray-400 hover:text-red-500 p-1.5 transition"
                              title="Remove stop"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {yatra.length > 0 && (
            <div className="p-4 border-t border-gray-100 bg-gray-50 space-y-2">
              <a
                href={gmapsRouteUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-india-green to-emerald-700 py-3 text-xs font-bold text-white shadow-md hover:opacity-95 transition"
              >
                <span>🗺️</span>
                <span>{isHindi ? 'गूगल मैप्स में संपूर्ण यात्रा मार्ग खोलें' : 'Open Complete Multi-Stop Route in Google Maps'}</span>
                <span>↗</span>
              </a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex-1 rounded-xl border border-gray-300 bg-white py-2 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
                >
                  🖨️ {isHindi ? 'प्रिंट करें' : 'Print / Save PDF'}
                </button>
                <button
                  type="button"
                  onClick={clearYatra}
                  className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 transition"
                >
                  {isHindi ? 'हटाएं' : 'Clear All'}
                </button>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
