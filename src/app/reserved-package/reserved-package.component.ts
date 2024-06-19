import { Component, OnInit } from '@angular/core';

import { HolidayCardService } from '../service/holiday-card.service';
import { HolidayPackage } from '../model/holiday-package.model';
import { AttractionVisit } from '../model/attraction-visit.model';
import { Router, RouterLink } from '@angular/router';
import { HolidayPackageService } from '../service/holiday-package.service';
import { Restaurant } from '../model/restaurant.model';
import { Hotel } from '../model/hotel.model';
import { Guide } from '../model/guide.model';
import { ReservationService } from '../service/reservation.service';

declare let L: any;

@Component({
  selector: 'app-reserved-package',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reserved-package.component.html',
  styleUrl: './reserved-package.component.css',
})
export class ReservedPackageComponent implements OnInit {

  map: any;
  marker: any;
  holidayPackage: HolidayPackage | undefined;
  restaurants: Restaurant[] = [];
  hotel: Hotel | undefined;
  guide: Guide | undefined;
  showMap: boolean = false;

  constructor(
    private hcs: HolidayCardService,
    private hps: HolidayPackageService,
    private rs: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rs.hotel$.subscribe({
      next: hotel => this.hotel = hotel,
      error: e => console.log(e),
    })

    this.rs.guide$.subscribe({
      next: guide => this.guide = guide,
      error: e => console.log(e)
    })

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
    }
  }

  initializeMap(lat: number, lng: number): void {
    this.showMap = true;
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

  goToAttraction(av: AttractionVisit) {
    this.hcs.setAttraction(av);
    this.router.navigate(['/attraction']);
  }
}
