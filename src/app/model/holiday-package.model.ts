import { AttractionVisit } from "./attraction-visit.model";

export interface HolidayPackage {
    id: number;
    packageDuration: number;
    packageType: string;
    country: string;
    city: string;
    priceRange: string;
    title: string;
    description: string;
    maxPeopleCount: number;
    imagePath: string;
    attractionVisits: AttractionVisit[];
  }