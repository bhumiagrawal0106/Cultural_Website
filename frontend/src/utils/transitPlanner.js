/**
 * transitPlanner.js
 * Distance calculation and multi-modal transit planning (Train, Bus, Flight) for Indian heritage yatras.
 */

export const MAJOR_HUBS = [
  { city: 'New Delhi', state: 'Delhi', lat: 28.6139, lng: 77.2090, airport: 'DEL', station: 'NDLS' },
  { city: 'Mumbai', state: 'Maharashtra', lat: 19.0760, lng: 72.8777, airport: 'BOM', station: 'CSMT' },
  { city: 'Bengaluru', state: 'Karnataka', lat: 12.9716, lng: 77.5946, airport: 'BLR', station: 'SBC' },
  { city: 'Kolkata', state: 'West Bengal', lat: 22.5726, lng: 88.3639, airport: 'CCU', station: 'HWH' },
  { city: 'Chennai', state: 'Tamil Nadu', lat: 13.0827, lng: 80.2707, airport: 'MAA', station: 'MAS' },
  { city: 'Hyderabad', state: 'Telangana', lat: 17.3850, lng: 78.4867, airport: 'HYD', station: 'SC' },
  { city: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873, airport: 'JAI', station: 'JP' },
  { city: 'Ahmedabad', state: 'Gujarat', lat: 23.0225, lng: 72.5714, airport: 'AMD', station: 'ADI' },
  { city: 'Lucknow', state: 'Uttar Pradesh', lat: 26.8467, lng: 80.9462, airport: 'LKO', station: 'LKO' },
  { city: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739, airport: 'VNS', station: 'BSB' },
  { city: 'Patna', state: 'Bihar', lat: 25.5941, lng: 85.1376, airport: 'PAT', station: 'PNBE' },
  { city: 'Chandigarh', state: 'Punjab/Haryana', lat: 30.7333, lng: 76.7794, airport: 'IXC', station: 'CDG' },
  { city: 'Kochi', state: 'Kerala', lat: 9.9312, lng: 76.2673, airport: 'COK', station: 'ERS' },
  { city: 'Guwahati', state: 'Assam', lat: 26.1445, lng: 91.7362, airport: 'GAU', station: 'GHY' },
  { city: 'Bhopal', state: 'Madhya Pradesh', lat: 23.2599, lng: 77.4126, airport: 'BHO', station: 'BPL' },
  { city: 'Bhubaneswar', state: 'Odisha', lat: 20.2961, lng: 85.8245, airport: 'BBI', station: 'BBS' },
];

/**
 * Calculates geographical distance in kilometers using the Haversine formula
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 0;
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Generates comprehensive multi-modal transit recommendation (Train, Bus, Flight)
 */
export function getTransitRecommendations(originCity, destinationCity, distanceKm) {
  const cleanOrigin = originCity.trim();
  const cleanDest = destinationCity.trim();
  const dist = Math.max(1, distanceKm);

  // External live booking & schedule links
  const flightUrl = `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(cleanOrigin)}+to+${encodeURIComponent(cleanDest)}`;
  const trainUrl = `https://www.confirmtkt.com/train-between-stations/${encodeURIComponent(cleanOrigin.toLowerCase())}-to-${encodeURIComponent(cleanDest.toLowerCase())}`;
  const busUrl = `https://www.redbus.in/bus-tickets/${encodeURIComponent(cleanOrigin.toLowerCase())}-to-${encodeURIComponent(cleanDest.toLowerCase())}`;
  const mapsTransitUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(cleanOrigin + ' India')}&destination=${encodeURIComponent(cleanDest + ' India')}&travelmode=transit`;

  if (dist < 350) {
    // Short Distance: Bus and Express Trains
    const busHours = (dist / 55).toFixed(1);
    const trainHours = (dist / 75).toFixed(1);

    return {
      primaryMode: 'bus',
      summary: `Distance: ~${dist} km • Recommended: Bus or Express Train`,
      modes: [
        {
          type: 'bus',
          icon: '🚌',
          name: 'State Roadways / AC Volvo Bus',
          duration: `~${busHours} hrs`,
          details: 'Direct intercity express bus service',
          bookUrl: busUrl,
          bookLabel: 'Check Buses on RedBus ↗',
        },
        {
          type: 'train',
          icon: '🚆',
          name: 'Vande Bharat / Intercity Express',
          duration: `~${trainHours} hrs`,
          details: 'Daily train connections via IRCTC',
          bookUrl: trainUrl,
          bookLabel: 'Check Trains on ConfirmTkt ↗',
        },
      ],
      mapsUrl: mapsTransitUrl,
    };
  }

  if (dist < 900) {
    // Medium Distance: Superfast Train, Vande Bharat, or Flight
    const trainHours = (dist / 80).toFixed(1);
    const flightHours = '1.2–1.8 hrs';

    return {
      primaryMode: 'train',
      summary: `Distance: ~${dist} km • Recommended: Superfast Train or Flight`,
      modes: [
        {
          type: 'train',
          icon: '🚆',
          name: 'Superfast Express / Vande Bharat',
          duration: `~${trainHours} hrs`,
          details: 'Recommended comfortable overland rail route',
          bookUrl: trainUrl,
          bookLabel: 'Search Trains (IRCTC) ↗',
        },
        {
          type: 'flight',
          icon: '✈️',
          name: 'Domestic Flight',
          duration: flightHours,
          details: 'Fastest connection between regional airports',
          bookUrl: flightUrl,
          bookLabel: 'Search Google Flights ↗',
        },
        {
          type: 'bus',
          icon: '🚌',
          name: 'Overnight Sleeper Bus',
          duration: `~${(dist / 50).toFixed(1)} hrs`,
          details: 'Comfortable overnight sleeper option',
          bookUrl: busUrl,
          bookLabel: 'View Buses ↗',
        },
      ],
      mapsUrl: mapsTransitUrl,
    };
  }

  // Long Distance: Domestic Flight is strongly recommended
  const flightHours = '2.0–3.0 hrs';
  const trainHours = (dist / 75).toFixed(1);

  return {
    primaryMode: 'flight',
    summary: `Distance: ~${dist} km • Recommended: Flight (Fastest) or Rajdhani Train`,
    modes: [
      {
        type: 'flight',
        icon: '✈️',
        name: 'Non-stop / Connecting Flight',
        duration: flightHours,
        details: 'Fastest travel option for long distance heritage yatra',
        bookUrl: flightUrl,
        bookLabel: 'Search Flights on Google Flights ↗',
      },
      {
        type: 'train',
        icon: '🚆',
        name: 'Rajdhani / Duronto / Superfast Express',
        duration: `~${trainHours} hrs`,
        details: 'Scenic long-distance overland journey across India',
        bookUrl: trainUrl,
        bookLabel: 'Search Trains on ConfirmTkt ↗',
      },
    ],
    mapsUrl: mapsTransitUrl,
  };
}
