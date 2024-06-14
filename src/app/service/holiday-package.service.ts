import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HolidayPackage } from '../model/holiday-package.model';
import { Questions } from '../model/survey.model';

@Injectable({
  providedIn: 'root'
})
export class HolidayPackageService {
  private citiesSubject = new BehaviorSubject<string[]>([]);
  cities$ = this.citiesSubject.asObservable(); 
  private packageUrl = 'http://localhost:8080/package';
  private surveyUrl = 'http://localhost:8080/survey';
  constructor(private http: HttpClient) {

    }

  getCities() :void{
    this.http.get<string[]>(`${this.packageUrl}/city`).subscribe({
      next: cities => this.citiesSubject.next(cities),
      error: err => console.log("errore nel caricamento delle città", err)
    });
  }

  getPackagesByCity(city: string): Observable<HolidayPackage[]> {
    //let url = `${this.packageUrl}?city=${city}`;
    //return this.http.get<HolidayPackage[]>(url);
    return this.http.get<HolidayPackage[]>(`${this.packageUrl}?city=${city}`);
  }

  getTypes(): Observable<string[]>{
    return this.http.get<string[]>(`${this.packageUrl}/type`);
  }
  getQuestions(): Observable<Questions[]>{
    return this.http.get<Questions[]>(this.surveyUrl);
  }

}
