import campuses from "@/app/data/campuses.json";
import { EmptyState } from "@/components/app/empty-state";
import { HardHat } from "lucide-react";

// Static export requirement: pre-generate all campus "coming soon" routes
export async function generateStaticParams() {
  return (campuses as any[]).map((c) => ({ campusId: c.id }));
}

export default function ComingSoonPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <EmptyState
        icon={<HardHat />}
        title="Coming Soon"
        description="We're working hard to add this campus. Please check back later!"
      />
    </div>
  );
}
