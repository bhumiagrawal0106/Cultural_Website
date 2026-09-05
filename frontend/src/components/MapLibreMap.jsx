import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';

/**
 * MapLibreMap — Free, open-source interactive map using MapLibre GL JS.
 * Renders using OpenStreetMap raster tiles — no API key required.
 * Styled to match the Bharat Darshan India theme (navy/saffron).
 *
 * Props:
 *  - lat {number}    Latitude
 *  - lng {number}    Longitude
 *  - name {string}   Place name for popup label
 *  - zoom {number}   Initial zoom level (default 13)
 */
export default function MapLibreMap({ lat, lng, name, zoom = 13 }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize MapLibre with OpenStreetMap raster tiles (free, no API key)
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        name: 'Bharat Darshan',
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
              'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxzoom: 19,
          },
        },
        layers: [
          {
            id: 'osm-tiles',
            type: 'raster',
            source: 'osm',
            minzoom: 0,
            maxzoom: 19,
            paint: {
              // Subtle cool-toned saturation shift to match navy/saffron theme
              'raster-saturation': -0.15,
              'raster-brightness-min': 0.02,
            },
          },
        ],
      },
      center: [lng, lat],
      zoom,
      attributionControl: false,
    });

    mapRef.current = map;

    // Custom attribution (smaller)
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

    // Navigation controls (zoom +/-)
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      // Custom pulsing marker using Canvas API
      const size = 80;
      const pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),
        onAdd() {
          const canvas = document.createElement('canvas');
          canvas.width = this.width;
          canvas.height = this.height;
          this.context = canvas.getContext('2d');
        },
        render() {
          const duration = 1400;
          const t = (performance.now() % duration) / duration;
          const radius = (size / 2) * 0.3;
          const outerRadius = (size / 2) * 0.7 * t + radius;
          const ctx = this.context;

          ctx.clearRect(0, 0, this.width, this.height);

          // Pulsing outer ring (india-orange)
          ctx.beginPath();
          ctx.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 153, 51, ${1 - t})`;
          ctx.fill();

          // Solid inner dot (india-navy)
          ctx.beginPath();
          ctx.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
          ctx.fillStyle = '#06038D';
          ctx.strokeStyle = 'white';
          ctx.lineWidth = 2.5;
          ctx.fill();
          ctx.stroke();

          this.data = ctx.getImageData(0, 0, this.width, this.height).data;
          map.triggerRepaint();
          return true;
        },
      };

      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [lng, lat] },
              properties: { name },
            },
          ],
        },
      });

      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'pulsing-dot',
          'icon-allow-overlap': true,
        },
      });

      // Popup on click
      map.on('click', 'points', (e) => {
        const coords = e.features[0].geometry.coordinates.slice();
        const popupName = e.features[0].properties.name;
        new maplibregl.Popup({ closeButton: false, offset: 20 })
          .setLngLat(coords)
          .setHTML(`<span>${popupName}</span>`)
          .addTo(map);
      });

      map.on('mouseenter', 'points', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'points', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [lat, lng, name, zoom]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-2xl overflow-hidden"
      aria-label={`Map showing location of ${name}`}
      role="img"
    />
  );
}
