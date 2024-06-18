import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HolidayPackage } from '../model/holiday-package.model';
import { Questions } from '../model/survey.model';
import { SurveyModel } from '../model/survey-form.model';
import { Restaurant } from '../model/restaurant.model';
import { Hotel } from '../model/hotel.model';
import { Guide } from '../model/guide.model';

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
  // getQuestions(): Observable<Questions[]>{
  //   const token = localStorage.getItem('token');
  //   let headers = new HttpHeaders();
  //   if(token){
  //     headers = headers.set('Authorization', `Bearer ${token}`);
  //   }
  //   return this.http.get<Questions[]>(this.surveyUrl,{headers});
  // }
  getQuestions(): Observable<Questions[]>{
    return this.http.get<Questions[]>(this.surveyUrl);
  }
  

  getPackageByAnswers(answers: SurveyModel): Observable<HolidayPackage>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
     return this.http.post<HolidayPackage>(`${this.packageUrl}`, answers, {headers});

  }

  getPackageById(id: number): Observable<HolidayPackage>{
    return this.http.get<HolidayPackage>(`${this.packageUrl}/${id}`);
  }

  getRestaurantsByPackage(id: number): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.packageUrl}/${id}/restaurants`);
  }

  getHotelbyPackage(id: number): Observable<Hotel>{
    return this.http.get<Hotel>(`${this.packageUrl}/${id}/hotel`);
  }

  getGuidebyCity(city: string): Observable<Guide>{
    return this.http.get<Guide>(`${this.packageUrl}/${city.replace(" ", "%20")}/guide`);
  }

}
