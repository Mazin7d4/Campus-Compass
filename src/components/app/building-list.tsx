"use client";

import { useState, useMemo } from "react";
import type { Building } from "@/app/lib/definitions";
import { Input } from "@/components/ui/input";
import { Search, Building as BuildingIcon, X } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "./empty-state";

type BuildingListProps = {
  buildings: Building[];
  campusId: string;
};

export function BuildingList({ buildings, campusId }: BuildingListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBuildings = useMemo(() => {
    if (!searchQuery) return buildings;

    const lowercasedQuery = searchQuery.toLowerCase();
    return buildings.filter(
      (building) =>
        building.name.toLowerCase().includes(lowercasedQuery) ||
        building.abbreviation.toLowerCase().includes(lowercasedQuery) ||
        building.aliases.some((alias: string) =>
          alias.toLowerCase().includes(lowercasedQuery)
        )
    );
  }, [searchQuery, buildings]);

  return (
    <div className="flex flex-col gap-8" role="search" aria-label="Search buildings">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-hidden="true" />
        <Input
          type="search"
          placeholder="Search building name or abbreviation..."
          className="pl-10 pr-10 h-12 text-lg rounded-lg [&::-webkit-search-cancel-button]:appearance-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search buildings by name or abbreviation"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Clear search query"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <div aria-live="polite" className="sr-only">
        {searchQuery && `${filteredBuildings.length} building${filteredBuildings.length !== 1 ? "s" : ""} found`}
      </div>

      {filteredBuildings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredBuildings.map((building) => (
            <Link
              key={building.id}
              href={`/campus/${campusId}/${building.id}`}
              className="group block"
              aria-label={`${building.name} (${building.abbreviation})`}
            >
              <div className="bg-card p-4 rounded-lg border shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200 h-full">
                <div className="flex items-center justify-between">
                    <h3 className="font-headline text-lg font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {building.name}
                    </h3>
                    <div className="text-xs font-mono bg-muted text-muted-foreground rounded-sm px-2 py-1">
                        {building.abbreviation}
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BuildingIcon />}
          title="No Buildings Found"
          description="Your search did not match any buildings. Try a different query."
        />
      )}
    </div>
  );
}
