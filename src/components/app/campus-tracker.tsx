"use client";

import { useEffect } from "react";
import { useRecentCampuses } from "@/hooks/use-recent-campuses";

export function CampusTracker({ campusId }: { campusId: string }) {
  const { recordVisit } = useRecentCampuses();

  useEffect(() => {
    recordVisit(campusId);
  }, [campusId, recordVisit]);

  return null;
}
