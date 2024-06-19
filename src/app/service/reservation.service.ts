import { Injectable } from '@angular/core';
import { ReservationModel } from '../model/reservation.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../model/hotel.model';
import { Guide } from '../model/guide.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private numPeopleSubject = new BehaviorSubject<number>(0);
  numPeople$ = this.numPeopleSubject.asObservable();

  private startDateSubject = new BehaviorSubject<Date | undefined>(undefined);
  startDate$ = this.startDateSubject.asObservable();

  private daysSubject = new BehaviorSubject<number>(0);
  days$ = this.daysSubject.asObservable();

  private hotelSubject = new BehaviorSubject<Hotel | undefined>(undefined);
  hotel$ = this.hotelSubject.asObservable();

  private guideSubject = new BehaviorSubject<Guide | undefined>(undefined);
  guide$ = this.guideSubject.asObservable();

  private reservationUrl = 'http://localhost:8080/holiday-reservation'

  constructor(private http: HttpClient) { }

  saveReservation(reservation: ReservationModel): Observable<ReservationModel>{
    return this.http.post<ReservationModel>(this.reservationUrl, reservation);
  }

  setNumPeople(numPeople: number){
    this.numPeopleSubject.next(numPeople);
  }

  setStartDate(startDate: Date){
    this.startDateSubject.next(startDate);
  }

  setDays(days: number){
    this.daysSubject.next(days);
  }

  setHotel(hotel: Hotel){
    this.hotelSubject.next(hotel);
  }

  setGuide(guide: Guide){
    this.guideSubject.next(guide);
  }
}
