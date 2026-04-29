import { getCampusById } from "@/app/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import CampusBackButton from "@/components/app/campus-back-button";
import { CampusTracker } from "@/components/app/campus-tracker";

export default async function CampusLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { campusId: string };
}) {
  const campus = await getCampusById(params.campusId);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-10 w-full bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <CampusBackButton campusId={params.campusId} />
              <h1 className="font-headline text-xl font-bold">
                {campus.shortName}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <CampusTracker campusId={params.campusId} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
