"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function CampusBackButton({ campusId }: { campusId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const campusRoot = `/campus/${campusId}`;
  const onCampusRoot = pathname === campusRoot;

  const handleClick = () => {
    if (onCampusRoot) {
      // Screen 2 -> Screen 1
      router.push("/");
    } else {
      // Screen 3 -> Screen 2 (always)
      router.push(campusRoot);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      <ChevronLeft className="mr-2 h-4 w-4" />
      {onCampusRoot ? "Change Campus" : "Back"}
    </Button>
  );
}
