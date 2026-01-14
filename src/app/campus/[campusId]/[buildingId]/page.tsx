import { getBuildingById } from "@/app/lib/data";
import { BuildingActions } from "@/components/app/building-actions";

// Static export requirement: pre-generate all dynamic routes
import campuses from "@/app/data/campuses.json";
import csusBuildings from "@/app/data/csus_buildings.json";

// NOTE: For now we only guarantee CSUS building pages exist.
// If SJSU/CSUEB building JSON exists later, we can extend this then.
export async function generateStaticParams() {
  const campusIds = (campuses as any[]).map((c) => c.id);

  const params: { campusId: string; buildingId: string }[] = [];

  for (const campusId of campusIds) {
    if (campusId === "csus") {
      for (const b of csusBuildings as any[]) {
        if (b?.id) params.push({ campusId: "csus", buildingId: b.id });
      }
    }
    // For other campuses, their building detail pages are "coming soon" anyway,
    // so we don't generate buildingId routes yet.
  }

  return params;
}

type BuildingPageProps = {
  params: {
    campusId: string;
    buildingId: string;
  };
};

export default async function BuildingPage({ params }: BuildingPageProps) {
  const building = await getBuildingById(params.campusId, params.buildingId);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-mono bg-muted text-muted-foreground rounded-sm px-2 py-1 inline-block mb-2">
            {building.abbreviation}
          </p>
          <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">
            {building.name}
          </h2>
        </div>

        <div className="bg-card p-8 rounded-lg border shadow-sm">
          <h3 className="font-headline text-xl font-semibold mb-2">
            What&apos;s here
          </h3>
          <p className="text-muted-foreground">{building.description}</p>
        </div>

        <div className="mt-8">
          <BuildingActions
            googleMapsUrl={building.googleMapsUrl}
            appleMapsUrl={building.appleMapsUrl}
          />
        </div>
      </div>
    </div>
  );
}
