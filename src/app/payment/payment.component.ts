import { Component, OnInit } from '@angular/core';
import { HolidayCardService } from '../service/holiday-card.service';
import { HolidayPackage } from '../model/holiday-package.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidayPackageService } from '../service/holiday-package.service';
import { Restaurant } from '../model/restaurant.model';
import { Hotel } from '../model/hotel.model';
import { Guide } from '../model/guide.model';
import { ReservationService } from '../service/reservation.service';
import { ReservationModel } from '../model/reservation.model';
import { RestaurantCheckIns } from '../model/restaurant-check-in.model';
import { DatePipe } from '@angular/common';

declare let L: any;
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {

  map: any;
  marker: any;
  

  holidayPackage: HolidayPackage | undefined;
  restaurants: Restaurant[] = [];
  hotel: Hotel | undefined;
  guide: Guide | undefined;
  numPeople: number = 0;
  startDate: Date | undefined;
  endDate: Date | undefined;
  days: number = 0;
  
  constructor(
    private hcs: HolidayCardService,
    private hps: HolidayPackageService,
    private rs: ReservationService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getPackageInfo(); 
    this.rs.numPeople$.subscribe({
      next: n => this.numPeople = n,
      error: e => console.log(e)
    })
    this.rs.startDate$.subscribe({
      next: sd => {
        if (sd) {
          this.startDate = new Date(sd); 
          if (!isNaN(this.startDate.getTime())) {
            this.calculateEndDate();
          } else {
            console.error('Invalid startDate');
          }
        } else {
          console.error('startDate is undefined');
        }
      },
      error : e => console.log(e)
    })
    this.rs.days$.subscribe({
      next: d => {
        this.days = d;
        this.calculateEndDate();
      },
      error: e => console.log(e)
    })
  }

  calculateEndDate():void {
    if (this.startDate && this.days > 0) {
      const endDate = new Date(this.startDate);
      endDate.setDate(this.startDate.getDate() + this.days - 1);
      this.endDate = endDate;
    }
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd')!;
  }

  formatDateTime(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddTHH:mm')!;
  }

  onSubmit(form: NgForm): void {
    console.log(form.value);
    
    const reservation: ReservationModel = {
      packageId : this.holidayPackage!.id,
      peopleCount : this.numPeople,
      cost: 1000,
      creationDate: new Date(),
      startDate: this.startDate!,
      guideId: this.guide!.id,
      startPerformanceDate: this.startDate!,
      endPerformanceDate: this.endDate!,
      hotelId: this.hotel!.id,
      restaurantCheckIns: [
        {
          restaurantId : this.restaurants[0].id,
          checkIn : this.startDate!,
        },
        {
          restaurantId : this.restaurants[1].id,
          checkIn : new Date(this.startDate!.getFullYear(), this.startDate!.getMonth(), this.startDate!.getDate() + 1),
        },
        {
          restaurantId : this.restaurants[2].id,
          checkIn: new Date(this.startDate!.getFullYear(), this.startDate!.getMonth(), this.startDate!.getDate() + 2),
        }
      ]
    }
    
    // Converti le date in stringhe formattate prima di inviare
    const formattedReservation = {
      ...reservation,
      creationDate: this.formatDate(reservation.creationDate),
      startDate: this.formatDate(reservation.startDate),
      startPerformanceDate: this.formatDate(reservation.startPerformanceDate),
      endPerformanceDate: this.formatDate(reservation.endPerformanceDate),
      restaurantCheckIns: reservation.restaurantCheckIns.map(checkIn => ({
        ...checkIn,
        checkIn: this.formatDateTime(checkIn.checkIn)
      }))
    };

    console.log('Formatted:', formattedReservation);

    this.rs.saveReservation(formattedReservation).subscribe({
      next: sr => console.log(sr),
      error: e => console.log(e)
    });
    this.router.navigate(['/reserved-package']);
  }

  getPackageInfo(): void {
    this.hcs.holidayPackage$.subscribe({
      next: (hPackage) => (this.holidayPackage = hPackage),
      error: (err) => console.log('errore nel passaggio di pacchetto', err),
    });

    if (this.holidayPackage) {
      this.hps.getRestaurantsByPackage(this.holidayPackage.id).subscribe({
        next: (r) => {
          this.restaurants = r;
        },
        error: (err) => console.log('errore nel recupero ristoranti', err),
      });

      this.hps.getHotelbyPackage(this.holidayPackage.id).subscribe({
        next: (h) => {
          this.hotel = h;
          this.rs.setHotel(this.hotel);
          this.initializeMap(this.hotel.latitude, this.hotel.longitude);
        },
        error: (err) => console.log('errore nel recupero hotel', err),
      });

      this.hps.getGuidebyCity(this.holidayPackage.city).subscribe({
        next: (g) => {
          this.guide = g;
          this.rs.setGuide(this.guide);
        },
        error: (err) => console.log('errore nel recupero della guida', err),
      });
    }
  }

  initializeMap(lat: number, lng: number): void {
    
    const todoMap = document.getElementById('map');
    if (!this.map && todoMap) {
      this.map = L.map(todoMap).setView([lat, lng], 17);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(this.map);
      this.marker = L.marker([lat, lng]).addTo(this.map);
    } else if (this.map) {
      this.map.setView([lat, lng], 13);
      this.marker.setLatLng([lat, lng]);
    }
    if (todoMap) {
      todoMap.style.display = 'block';
      this.map.invalidateSize();
    }
  }
}
