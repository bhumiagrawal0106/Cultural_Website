import { useCallback, useEffect, useRef, useState } from 'react';
import api from '../services/api';

// Simple in-memory cache: url → { data, timestamp }
const cache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

function getCached(path) {
  const entry = cache.get(path);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    cache.delete(path);
    return null;
  }
  return entry.data;
}

function setCached(path, data) {
  cache.set(path, { data, timestamp: Date.now() });
}

/**
 * Fetches a GET endpoint and exposes { data, loading, error, refetch }.
 * Pass a falsy path to skip fetching.
 * Results are cached in-memory for 5 minutes — avoids re-fetching on
 * back-navigation and route switches.
 */
export default function useFetch(path) {
  const [state, setState] = useState(() => {
    // Serve from cache immediately (no loading flash for cached routes)
    const cached = path ? getCached(path) : null;
    return { data: cached, loading: Boolean(path && !cached), error: null };
  });
  const [tick, setTick] = useState(0);
  const pathRef = useRef(path);
  pathRef.current = path;

  useEffect(() => {
    if (!path) {
      setState({ data: null, loading: false, error: null });
      return undefined;
    }

    // Return cached data instantly, skip network call
    const cached = getCached(path);
    if (cached && tick === 0) {
      setState({ data: cached, loading: false, error: null });
      return undefined;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    api
      .get(path)
      .then((data) => {
        if (!cancelled) {
          setCached(path, data);
          setState({ data, loading: false, error: null });
        }
      })
      .catch((error) => {
        if (!cancelled) setState({ data: null, loading: false, error });
      });

    return () => {
      cancelled = true;
    };
  }, [path, tick]);

  const refetch = useCallback(() => {
    // Clear cache for this path so refetch goes to network
    if (pathRef.current) cache.delete(pathRef.current);
    setTick((t) => t + 1);
  }, []);

  return { ...state, refetch };
}
