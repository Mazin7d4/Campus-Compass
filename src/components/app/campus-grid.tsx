"use client";

import { useState, useMemo } from "react";
import type { Campus } from "@/app/lib/definitions";
import { useRecentCampuses } from "@/hooks/use-recent-campuses";
import { CampusCard } from "@/components/app/campus-card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type CampusGridProps = {
  campuses: Campus[];
};

export function CampusGrid({ campuses }: CampusGridProps) {
  const [query, setQuery] = useState("");
  const { recentIds, isHydrated } = useRecentCampuses();

  const { recents, others, searchResults } = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (q) {
      const filtered = campuses.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.shortName.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q)
      );
      // Float recently visited matches to the top
      const recentSet = new Set(recentIds);
      const top = filtered.filter((c) => recentSet.has(c.id));
      const rest = filtered.filter((c) => !recentSet.has(c.id));
      return { recents: [], others: [], searchResults: [...top, ...rest] };
    }

    // No query — split into recently visited vs all others
    const recentOrder = recentIds
      .map((id) => campuses.find((c) => c.id === id))
      .filter((c): c is Campus => !!c);

    const recentSet = new Set(recentIds);
    const remaining = campuses.filter((c) => !recentSet.has(c.id));

    return { recents: recentOrder, others: remaining, searchResults: [] };
  }, [query, campuses, recentIds]);

  return (
    <div className="w-full max-w-6xl space-y-10">
      {/* Search bar */}
      <div className="relative" role="search" aria-label="Search campuses">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search campuses by name, abbreviation, or city..."
          className="pl-10 h-12 text-base rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search campuses"
        />
      </div>

      {query ? (
        /* Search results */
        <>
          <div aria-live="polite" className="sr-only">
            {`${searchResults.length} campus${searchResults.length !== 1 ? "es" : ""} found`}
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {searchResults.map((campus) => (
                <CampusCard key={campus.id} campus={campus} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-16 text-lg">
              No campuses match &ldquo;{query}&rdquo;
            </p>
          )}
        </>
      ) : (
        /* Default view: recently visited + all campuses */
        <>
          {isHydrated && recents.length > 0 && (
            <section aria-labelledby="recents-heading">
              <h2
                id="recents-heading"
                className="font-headline text-xl font-semibold mb-5 text-muted-foreground uppercase tracking-widest"
              >
                Recently Visited
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recents.map((campus) => (
                  <CampusCard key={campus.id} campus={campus} />
                ))}
              </div>
            </section>
          )}

          <section aria-labelledby="all-heading">
            {isHydrated && recents.length > 0 && (
              <h2
                id="all-heading"
                className="font-headline text-xl font-semibold mb-5 text-muted-foreground uppercase tracking-widest"
              >
                All Campuses
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(isHydrated ? others : campuses).map((campus) => (
                <CampusCard key={campus.id} campus={campus} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
