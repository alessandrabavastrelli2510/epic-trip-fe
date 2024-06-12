import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AttractionVisit } from './attraction-visit/attraction-visit.component';
import { HolidayPackageListComponent } from './holiday-package-list/holiday-package-list.component';

@Injectable({
  providedIn: 'root'
})
export class HolidayPackage {
  private apiUrl = 'http://localhost:8080/package';
  private apiUrlForCities = "http://localhost:8080/package/city";
  constructor(private http: HttpClient) {
    }

  //getAttractionVisitsByCity(): Observable<AttractionVisit[]> {
  //  return this.http.get<AttractionVisit[]>(this.apiUrl);
  //}

  getCities(): Observable<string[]>{
    return this.http.get<string[]>(this.apiUrlForCities);
  }

  getPackagesByCity(city: string): Observable<HolidayPackage[]> {
    return this.http.get<HolidayPackage[]>(`${this.apiUrl}/${city}`);
  }

  getAttractionVisitById(id: number): Observable<AttractionVisit> {
    return this.http.get<AttractionVisit>(`${this.apiUrl}/${id}`);
  }

}
