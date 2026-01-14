import { CampusCard } from "@/components/app/campus-card";
import { getCampuses } from "@/app/lib/data";

export default async function Home() {
  const campuses = await getCampuses();

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-8 md:p-12">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight">Campus Compass</h1>
        <p className="text-muted-foreground text-lg mt-2">Your guide to university campuses.</p>
      </div>
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campuses.map((campus) => (
            <CampusCard key={campus.id} campus={campus} />
          ))}
        </div>
      </div>
    </main>
  );
}
