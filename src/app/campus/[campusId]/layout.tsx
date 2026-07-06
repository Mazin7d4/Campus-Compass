import { getCampusById } from "@/app/lib/data";
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
    <div className="flex min-h-svh flex-col">
      <header className="app-safe-top sticky top-0 z-10 w-full border-b bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto app-safe-x">
          <div className="flex min-h-16 items-center justify-between py-2">
            <div className="flex min-w-0 items-center gap-3">
              <CampusBackButton campusId={params.campusId} />
              <h1 className="min-w-0 truncate font-headline text-xl font-bold">
                {campus.shortName}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <CampusTracker campusId={params.campusId} />
      <div className="app-safe-bottom flex-1">{children}</div>
    </div>
  );
}
