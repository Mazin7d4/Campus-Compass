export interface Campus {
  id: string;
  name: string;
  shortName: string;
  city: string;
  heroImageId: string;
  logoId: string;
  isAvailable: boolean;
}

export interface Building {
  id: string;
  campusId: string;
  name:string;
  abbreviation: string;
  aliases: string[];
  description: string;
  googleMapsUrl: string;
  appleMapsUrl: string;
}
