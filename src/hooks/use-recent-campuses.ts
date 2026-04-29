"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "recent-campuses";
const MAX_RECENTS = 5;

export function useRecentCampuses() {
  const [recentIds, setRecentIds] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentIds(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  const recordVisit = useCallback((campusId: string) => {
    setRecentIds((prev) => {
      const deduplicated = prev.filter((id) => id !== campusId);
      const updated = [campusId, ...deduplicated].slice(0, MAX_RECENTS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore storage errors
      }
      return updated;
    });
  }, []);

  return { recentIds, recordVisit, isHydrated };
}
