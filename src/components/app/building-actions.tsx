"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Map, Copy, Check } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type BuildingActionsProps = {
  googleMapsUrl: string;
  appleMapsUrl: string;
};

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function BuildingActions({
  googleMapsUrl,
  appleMapsUrl,
}: BuildingActionsProps) {
  const { toast } = useToast();
  const [copiedLabel, setCopiedLabel] = useState<"google" | "apple" | null>(
    null
  );

  const copyToClipboard = async (
    url: string,
    label: "google" | "apple"
  ) => {
    const clean = (url ?? "").trim();
    if (!clean) {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description: "No link found to copy.",
      });
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(clean);
      } else {
        const ok = fallbackCopy(clean);
        if (!ok) throw new Error("fallback copy failed");
      }

      setCopiedLabel(label);
      toast({
        title: "Link Copied",
        description:
          label === "google"
            ? "Google Maps link copied."
            : "Apple Maps link copied.",
      });
      setTimeout(() => setCopiedLabel(null), 1500);
    } catch {
      toast({
        variant: "destructive",
        title: "Copy Failed",
        description:
          "Clipboard blocked on this device. Try long-press or use Share instead.",
      });
    }
  };

  const isCopied = copiedLabel !== null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Navigate dropdown (UNCHANGED behavior) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="lg" className="h-14 text-lg" aria-label="Navigate to this building">
            <Map className="mr-2 h-5 w-5" aria-hidden="true" />
            Navigate
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-60">
          <DropdownMenuItem asChild>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Open in Google Maps
            </a>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <a
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              Open in Apple Maps
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Copy dropdown (NEW) */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="lg" className="h-14 text-lg" aria-label="Copy map link to clipboard">
            {isCopied ? (
              <Check className="mr-2 h-5 w-5" aria-hidden="true" />
            ) : (
              <Copy className="mr-2 h-5 w-5" aria-hidden="true" />
            )}
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="w-60">
          <DropdownMenuItem
            onClick={() => copyToClipboard(googleMapsUrl, "google")}
          >
            Copy Google Maps link
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => copyToClipboard(appleMapsUrl, "apple")}
          >
            Copy Apple Maps link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
