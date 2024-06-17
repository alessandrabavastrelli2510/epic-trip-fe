import { Injectable } from '@angular/core';
import { AttractionVisit } from '../model/attraction-visit.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HolidayCardService {

  private attractionSubject = new BehaviorSubject<AttractionVisit | undefined>(undefined);
  attraction$ = this.attractionSubject.asObservable();

  constructor() { }

  setAttraction(attraction: AttractionVisit){
    this.attractionSubject.next(attraction);
  }

  // getAttraction():AttractionVisit | undefined {
  //   return this.attractionSubject.value;
  // }
}
