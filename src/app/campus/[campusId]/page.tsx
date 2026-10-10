import { getBuildingsByCampusId } from "@/app/lib/data";
import { BuildingList } from "@/components/app/building-list";

// Static export requirement: pre-generate all campus routes
import campuses from "@/app/data/campuses.json";

export async function generateStaticParams() {
  return (campuses as any[]).map((c) => ({ campusId: c.id }));
}

type CampusPageProps = {
  params: Promise<{
    campusId: string;
  }>;
};

export default async function CampusPage({ params }: CampusPageProps) {
  const { campusId } = await params;
  const buildings = await getBuildingsByCampusId(campusId);

  return (
    <main id="main-content" className="container mx-auto app-safe-x py-8">
      <BuildingList buildings={buildings} campusId={campusId} />
    </main>
  );
}
