import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { Building, Campus } from './definitions';
import { notFound } from 'next/navigation';

export async function getCampuses(): Promise<Campus[]> {
  const file = await fs.readFile(path.join(process.cwd(), 'src/app/data/campuses.json'), 'utf8');
  const data = JSON.parse(file);
  return data;
}

export async function getCampusById(id: string): Promise<Campus> {
  const campuses = await getCampuses();
  const campus = campuses.find((c) => c.id === id);
  if (!campus) {
    notFound();
  }
  return campus;
}

export async function getBuildingsByCampusId(campusId: string): Promise<Building[]> {
  try {
    const filePath = path.join(process.cwd(), `src/app/data/${campusId}_buildings.json`);
    const file = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(file);
    return data;
  } catch (error) {
    console.error(`Could not read buildings for campus ${campusId}:`, error);
    return [];
  }
}

export async function getBuildingById(campusId: string, buildingId: string): Promise<Building> {
  const buildings = await getBuildingsByCampusId(campusId);
  const building = buildings.find((b) => b.id === buildingId);
  if (!building) {
    notFound();
  }
  return building;
}
