import { CampusGrid } from "@/components/app/campus-grid";
import { getCampuses } from "@/app/lib/data";

export default async function Home() {
  const campuses = await getCampuses();

  return (
    <main id="main-content" className="app-safe-page flex min-h-svh flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">Campus Compass</h1>
        <p className="text-muted-foreground text-lg mt-2">Your guide to university campuses.</p>
      </div>
      <CampusGrid campuses={campuses} />
    </main>
  );
}
