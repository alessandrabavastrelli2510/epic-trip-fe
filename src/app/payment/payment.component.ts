import { Component, OnInit } from '@angular/core';
import { HolidayCardService } from '../service/holiday-card.service';
import { HolidayPackage } from '../model/holiday-package.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HolidayPackageService } from '../service/holiday-package.service';
import { Restaurant } from '../model/restaurant.model';
import { Hotel } from '../model/hotel.model';
import { Guide } from '../model/guide.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  holidayPackage: HolidayPackage | undefined;
  restaurants: Restaurant[] = [];
  hotel: Hotel | undefined;
  guide: Guide | undefined;
  


  constructor(private hcs: HolidayCardService, private hps: HolidayPackageService,private router: Router){}


  onSubmit(form: NgForm){
    console.log(form.value);
    this.router.navigate(['/reserved-package']);
    this.getPackageInfo();
  }

  getPackageInfo():void{
    this.hcs.holidayPackage$.subscribe({
      next: (hPackage) => (this.holidayPackage = hPackage),
      error: (err) => console.log('errore nel passaggio di pacchetto', err),
    });

    if (this.holidayPackage) {
      this.hps.getRestaurantsByPackage(this.holidayPackage.id).subscribe({
        next: (r) => {
          this.restaurants = r;
          console.log(this.restaurants);
        },
        error: (err) => console.log('errore nel recupero ristoranti', err),
      });

      this.hps.getHotelbyPackage(this.holidayPackage.id).subscribe({
        next: (h) => {
          console.log(h);
          this.hotel = h;
          console.log(this.hotel);
        },
        error: (err) => console.log('errore nel recupero hotel', err),
      });

      this.hps.getGuidebyCity(this.holidayPackage.city).subscribe({
        next: (g) => {
          console.log(g);
          this.guide = g;
        },
        error: (err) => console.log('errore nel recupero della guida', err),
      });
    }
  }

}
