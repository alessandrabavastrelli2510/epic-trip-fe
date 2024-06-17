import { Injectable } from '@angular/core';
import { AttractionVisit } from '../model/attraction-visit.model';
import { BehaviorSubject } from 'rxjs';
import { HolidayPackage } from '../model/holiday-package.model';


@Injectable({
  providedIn: 'root'
})
export class HolidayCardService {

  private attractionSubject = new BehaviorSubject<AttractionVisit | undefined>(undefined);
  attraction$ = this.attractionSubject.asObservable();

  private holidayPackageSubject = new BehaviorSubject<HolidayPackage | undefined>(undefined);
  holidayPackage$ = this.holidayPackageSubject.asObservable(); 

  constructor() { }

  setAttraction(attraction: AttractionVisit){
    this.attractionSubject.next(attraction);
  }

  setPackage(holidayPackage: HolidayPackage){
    this.holidayPackageSubject.next(holidayPackage);
  }

  // getAttraction():AttractionVisit | undefined {
  //   return this.attractionSubject.value;
  // }
}
