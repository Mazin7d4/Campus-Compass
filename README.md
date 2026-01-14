# Campus Compass

This is a Next.js application designed to help users navigate university campuses.

## Getting Started

To get started with development, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Data Management

The application data is stored in local JSON files within the `src/app/data/` directory. This makes it easy to manage content without needing a database for this version.

### Editing Buildings

To add or edit buildings for a campus, modify the corresponding JSON file (e.g., `src/app/data/csus_buildings.json`). Each building object must follow this structure:

```json
{
  "id": "string",
  "campusId": "string",
  "name": "string",
  "abbreviation": "string",
  "aliases": ["string"],
  "description": "string",
  "googleMapsUrl": "string (URL)",
  "appleMapsUrl": "string (URL)"
}
```

- **id**: A unique, lowercase identifier for the building (e.g., "rvr").
- **campusId**: The ID of the campus this building belongs to (e.g., "csus").
- **name**: The full name of the building.
- **abbreviation**: The official abbreviation (e.g., "RVR").
- **aliases**: An array of alternative names or abbreviations for search purposes.
- **description**: A brief description of the building.
- **googleMapsUrl**: A pre-formatted URL for Google Maps navigation.
- **appleMapsUrl**: A pre-formatted URL for Apple Maps navigation.

### Adding a New Campus

1.  **Add Campus Info**: Add a new campus object to `src/app/data/campuses.json`.
2.  **Create Building Data**: Create a new file named `[campusId]_buildings.json` in `src/app/data/`. For example, for a campus with `id: "sjsu"`, create `sjsu_buildings.json`.
3.  **Add Assets**: Add a hero image for the campus to `src/lib/placeholder-images.json` and a logo SVG to `src/components/icons/campus-logos.tsx`.
