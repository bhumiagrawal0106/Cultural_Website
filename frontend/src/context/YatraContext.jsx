import { createContext, useContext, useState, useEffect } from 'react';

const YatraContext = createContext();

const STORAGE_KEY = 'bharat_darshan_yatra_items';

export function YatraProvider({ children }) {
  const [yatra, setYatra] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(yatra));
    } catch (e) {
      // Ignore
    }
  }, [yatra]);

  const addToYatra = (item, collection = 'places') => {
    if (!item || !item._id) return;
    setYatra((prev) => {
      if (prev.some((p) => p._id === item._id)) return prev;
      return [
        ...prev,
        {
          _id: item._id,
          name_en: item.name_en || item.name || '',
          name_hi: item.name_hi || '',
          collection,
          type: item.type || collection,
          stateName: item.stateId?.name_en || item.stateName || '',
          image: item.images?.[0] || '',
          coordinates: item.coordinates || null,
          bestTimeToVisit: item.bestTimeToVisit || '',
          addedAt: Date.now(),
        },
      ];
    });
    setIsDrawerOpen(true);
  };

  const removeFromYatra = (id) => {
    setYatra((prev) => prev.filter((p) => p._id !== id));
  };

  const clearYatra = () => {
    setYatra([]);
  };

  const isInYatra = (id) => {
    if (!id) return false;
    return yatra.some((p) => p._id === id);
  };

  const toggleYatra = (item, collection = 'places') => {
    if (isInYatra(item._id)) {
      removeFromYatra(item._id);
    } else {
      addToYatra(item, collection);
    }
  };

  return (
    <YatraContext.Provider
      value={{
        yatra,
        isDrawerOpen,
        setIsDrawerOpen,
        addToYatra,
        removeFromYatra,
        clearYatra,
        isInYatra,
        toggleYatra,
        count: yatra.length,
      }}
    >
      {children}
    </YatraContext.Provider>
  );
}

export function useYatra() {
  const context = useContext(YatraContext);
  if (!context) {
    throw new Error('useYatra must be used within a YatraProvider');
  }
  return context;
}
