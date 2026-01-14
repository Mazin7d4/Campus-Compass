"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, Share2, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

type BuildingActionsProps = {
  googleMapsUrl: string;
  appleMapsUrl: string;
};

export function BuildingActions({
  googleMapsUrl,
  appleMapsUrl,
}: BuildingActionsProps) {
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setIsCopied(true);
      toast({
        title: "Link Copied",
        description: "The page link has been copied to your clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "Could not copy the link to your clipboard.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="lg" className="h-14 text-lg">
                    <Map className="mr-2 h-5 w-5" />
                    Navigate
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Open in Google Maps
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <a href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Open in Apple Maps
                    </a>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

      <Button variant="secondary" size="lg" className="h-14 text-lg" onClick={handleCopy}>
        {isCopied ? (
            <Check className="mr-2 h-5 w-5" />
        ) : (
            <Copy className="mr-2 h-5 w-5" />
        )}
        {isCopied ? "Copied!" : "Copy Link"}
      </Button>
    </div>
  );
}
