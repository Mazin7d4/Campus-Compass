import { getBuildingsByCampusId } from "@/app/lib/data";
import { BuildingList } from "@/components/app/building-list";

// Static export requirement: pre-generate all campus routes
import campuses from "@/app/data/campuses.json";

export async function generateStaticParams() {
  return (campuses as any[]).map((c) => ({ campusId: c.id }));
}

type CampusPageProps = {
  params: {
    campusId: string;
  };
};

export default async function CampusPage({ params }: CampusPageProps) {
  const buildings = await getBuildingsByCampusId(params.campusId);

  return (
    <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <BuildingList buildings={buildings} campusId={params.campusId} />
    </main>
  );
}
