import Link from "next/link";
import Image from "next/image";
import type { Campus } from "@/lib/definitions";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CampusLogo } from "@/components/icons";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

type CampusCardProps = {
  campus: Campus;
};

export function CampusCard({ campus }: CampusCardProps) {
  const placeholderImage = PlaceHolderImages.find(p => p.id === campus.heroImageId);
  const href = campus.isAvailable ? `/campus/${campus.id}` : `/campus/${campus.id}/coming-soon`;

  return (
    <Link href={href} className="group block">
      <Card className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
        <div className="absolute inset-0">
          {placeholderImage && (
            <Image
              src={placeholderImage.imageUrl}
              alt={placeholderImage.description}
              data-ai-hint={placeholderImage.imageHint}
              fill
              className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        <div className="relative flex flex-col justify-end h-80 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CampusLogo id={campus.logoId} className="w-12 h-12 text-white mb-4" />
              <h2 className="font-headline text-2xl font-bold text-white tracking-tight">{campus.shortName}</h2>
              <p className="text-white/80">{campus.city}</p>
            </div>
            <div className="flex-shrink-0">
              {!campus.isAvailable && (
                <Badge variant="secondary">Coming Soon</Badge>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground">
                <ArrowRight className="w-5 h-5" />
             </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
