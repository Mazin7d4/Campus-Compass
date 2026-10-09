"use client";

import { useState, useMemo } from "react";
import type { Campus } from "@/app/lib/definitions";
import { useRecentCampuses } from "@/hooks/use-recent-campuses";
import { CampusCard } from "@/components/app/campus-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

type CampusGridProps = {
  campuses: Campus[];
};

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getCampusSearchText = (campus: Campus) =>
  normalizeSearchText(
    [
      campus.id,
      campus.name,
      campus.shortName,
      campus.city,
      campus.city.replace(/,\s*CA$/i, ""),
    ].join(" ")
  );

const campusMatchesQuery = (campus: Campus, query: string) => {
  const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);

  if (terms.length === 0) {
    return true;
  }

  const searchText = getCampusSearchText(campus);
  return terms.every((term) => searchText.includes(term));
};

export function CampusGrid({ campuses }: CampusGridProps) {
  const [query, setQuery] = useState("");
  const { recentIds, isHydrated } = useRecentCampuses();

  const { recents, others, searchResults } = useMemo(() => {
    const q = query.trim();

    if (q) {
      const filtered = campuses.filter((campus) => campusMatchesQuery(campus, q));
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
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder="Search campuses by name, abbreviation, or city..."
          className="pl-10 pr-10 h-12 text-base rounded-lg [&::-webkit-search-cancel-button]:appearance-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search campuses"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        )}
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
