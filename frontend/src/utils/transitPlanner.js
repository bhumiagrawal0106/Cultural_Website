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
 * Direct booking portals for RedBus, IRCTC, Flights, Uber, and Ola
 */
export function getDirectBookingPortals(originCity = '', destinationCity = '') {
  const cleanOrigin = (originCity || '').trim();
  const cleanDest = (destinationCity || '').trim();

  return {
    redbus: {
      id: 'redbus',
      name: 'RedBus',
      type: 'Bus',
      icon: '🚌',
      tag: 'Official Bus Booking',
      label: 'Book on RedBus ↗',
      url: cleanOrigin && cleanDest
        ? `https://www.redbus.in/bus-tickets/${encodeURIComponent(cleanOrigin.toLowerCase())}-to-${encodeURIComponent(cleanDest.toLowerCase())}`
        : 'https://www.redbus.in/',
      color: 'bg-red-600 hover:bg-red-700 text-white',
    },
    irctc: {
      id: 'irctc',
      name: 'IRCTC',
      type: 'Train',
      icon: '🚆',
      tag: 'Official Indian Railways',
      label: 'Book on IRCTC ↗',
      url: 'https://www.irctc.co.in/nget/train-search',
      color: 'bg-blue-800 hover:bg-blue-900 text-white',
    },
    flights: {
      id: 'flights',
      name: 'Flights',
      type: 'Airlines',
      icon: '✈️',
      tag: 'MakeMyTrip & Google Flights',
      label: 'Book Flight Tickets ↗',
      url: cleanOrigin && cleanDest
        ? `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(cleanOrigin)}+to+${encodeURIComponent(cleanDest)}`
        : 'https://www.makemytrip.com/flights/',
      color: 'bg-sky-600 hover:bg-sky-700 text-white',
    },
    uber: {
      id: 'uber',
      name: 'Uber',
      type: 'Cab / Taxi',
      icon: '🚕',
      tag: 'Direct City Ride & Cab',
      label: 'Book Uber Cab ↗',
      url: cleanDest
        ? `https://m.uber.com/looking?dropoff[formatted_address]=${encodeURIComponent(cleanDest + ', India')}`
        : 'https://m.uber.com/',
      color: 'bg-neutral-900 hover:bg-black text-white',
    },
    ola: {
      id: 'ola',
      name: 'Ola Cabs',
      type: 'Cab / Auto',
      icon: '🚖',
      tag: 'Direct Taxi & Auto Ride',
      label: 'Book Ola Cab ↗',
      url: cleanDest
        ? `https://book.olacabs.com/?drop_name=${encodeURIComponent(cleanDest)}`
        : 'https://book.olacabs.com/',
      color: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    },
  };
}

/**
 * Generates comprehensive multi-modal transit recommendation (Train, Bus, Flight, Cab)
 */
export function getTransitRecommendations(originCity, destinationCity, distanceKm) {
  const cleanOrigin = originCity.trim();
  const cleanDest = destinationCity.trim();
  const dist = Math.max(1, distanceKm);

  // External live booking & schedule links
  const flightUrl = `https://www.google.com/travel/flights?q=flights+from+${encodeURIComponent(cleanOrigin)}+to+${encodeURIComponent(cleanDest)}`;
  const irctcUrl = 'https://www.irctc.co.in/nget/train-search';
  const confirmTktUrl = `https://www.confirmtkt.com/train-between-stations/${encodeURIComponent(cleanOrigin.toLowerCase())}-to-${encodeURIComponent(cleanDest.toLowerCase())}`;
  const busUrl = `https://www.redbus.in/bus-tickets/${encodeURIComponent(cleanOrigin.toLowerCase())}-to-${encodeURIComponent(cleanDest.toLowerCase())}`;
  const uberUrl = `https://m.uber.com/looking?dropoff[formatted_address]=${encodeURIComponent(cleanDest + ', India')}`;
  const olaUrl = `https://book.olacabs.com/?drop_name=${encodeURIComponent(cleanDest)}`;
  const mapsTransitUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(cleanOrigin + ' India')}&destination=${encodeURIComponent(cleanDest + ' India')}&travelmode=transit`;

  const portals = getDirectBookingPortals(cleanOrigin, cleanDest);

  if (dist < 350) {
    // Short Distance: Bus, Express Trains, and Local Cabs
    const busHours = (dist / 55).toFixed(1);
    const trainHours = (dist / 75).toFixed(1);

    return {
      primaryMode: 'bus',
      summary: `Distance: ~${dist} km • Recommended: RedBus, IRCTC Train, or Direct Cab`,
      portals,
      modes: [
        {
          type: 'bus',
          icon: '🚌',
          name: 'RedBus AC Volvo / Express',
          duration: `~${busHours} hrs`,
          details: 'Direct intercity express bus tickets via RedBus',
          bookUrl: busUrl,
          bookLabel: 'Book on RedBus ↗',
        },
        {
          type: 'train',
          icon: '🚆',
          name: 'IRCTC Vande Bharat / Express',
          duration: `~${trainHours} hrs`,
          details: 'Official Indian Railways reservations on IRCTC',
          bookUrl: irctcUrl,
          altUrl: confirmTktUrl,
          bookLabel: 'Book on IRCTC ↗',
        },
        {
          type: 'cab',
          icon: '🚕',
          name: 'Uber Intercity / Local Cab',
          duration: `~${(dist / 60).toFixed(1)} hrs`,
          details: 'Direct doorstep cab pickup to destination',
          bookUrl: uberUrl,
          bookLabel: 'Book Uber ↗',
        },
        {
          type: 'cab',
          icon: '🚖',
          name: 'Ola Outstation / City Ride',
          duration: `~${(dist / 60).toFixed(1)} hrs`,
          details: 'Comfortable one-way or roundtrip cab via Ola',
          bookUrl: olaUrl,
          bookLabel: 'Book Ola ↗',
        },
      ],
      mapsUrl: mapsTransitUrl,
    };
  }

  if (dist < 900) {
    // Medium Distance: IRCTC Superfast Train, Flight, or RedBus
    const trainHours = (dist / 80).toFixed(1);
    const flightHours = '1.2–1.8 hrs';

    return {
      primaryMode: 'train',
      summary: `Distance: ~${dist} km • Recommended: IRCTC Train, Domestic Flight, or RedBus`,
      portals,
      modes: [
        {
          type: 'train',
          icon: '🚆',
          name: 'IRCTC Superfast / Vande Bharat',
          duration: `~${trainHours} hrs`,
          details: 'Recommended comfortable overland rail route on IRCTC',
          bookUrl: irctcUrl,
          altUrl: confirmTktUrl,
          bookLabel: 'Book on IRCTC ↗',
        },
        {
          type: 'flight',
          icon: '✈️',
          name: 'Domestic Flight (MakeMyTrip)',
          duration: flightHours,
          details: 'Fastest regional air connection across India',
          bookUrl: flightUrl,
          bookLabel: 'Search Flights ↗',
        },
        {
          type: 'bus',
          icon: '🚌',
          name: 'RedBus Overnight Sleeper',
          duration: `~${(dist / 50).toFixed(1)} hrs`,
          details: 'Comfortable overnight sleeper bus via RedBus',
          bookUrl: busUrl,
          bookLabel: 'Book on RedBus ↗',
        },
        {
          type: 'cab',
          icon: '🚕',
          name: 'Uber / Ola Outstation',
          duration: `~${(dist / 60).toFixed(1)} hrs`,
          details: 'Dedicated private outstation cab service',
          bookUrl: uberUrl,
          bookLabel: 'Check Uber/Ola ↗',
        },
      ],
      mapsUrl: mapsTransitUrl,
    };
  }

  // Long Distance: Domestic Flight or IRCTC Rajdhani Train
  const flightHours = '2.0–3.0 hrs';
  const trainHours = (dist / 75).toFixed(1);

  return {
    primaryMode: 'flight',
    summary: `Distance: ~${dist} km • Recommended: Flight (Fastest) or IRCTC Rajdhani Train`,
    portals,
    modes: [
      {
        type: 'flight',
        icon: '✈️',
        name: 'Domestic Flight (MakeMyTrip / Google)',
        duration: flightHours,
        details: 'Fastest travel option for long distance heritage yatra',
        bookUrl: flightUrl,
        bookLabel: 'Book Flights ↗',
      },
      {
        type: 'train',
        icon: '🚆',
        name: 'IRCTC Rajdhani / Duronto Express',
        duration: `~${trainHours} hrs`,
        details: 'Official Indian Railways reservations on IRCTC',
        bookUrl: irctcUrl,
        altUrl: confirmTktUrl,
        bookLabel: 'Book on IRCTC ↗',
      },
      {
        type: 'bus',
        icon: '🚌',
        name: 'RedBus Inter-State Service',
        duration: `~${(dist / 50).toFixed(1)} hrs`,
        details: 'Long-distance inter-state Volvo buses via RedBus',
        bookUrl: busUrl,
        bookLabel: 'Check RedBus ↗',
      },
      {
        type: 'cab',
        icon: '🚕',
        name: 'Uber Airport / Local Cab',
        duration: 'On-demand',
        details: 'Local airport transfers and city rides',
        bookUrl: uberUrl,
        bookLabel: 'Book Uber ↗',
      },
    ],
    mapsUrl: mapsTransitUrl,
  };
}
