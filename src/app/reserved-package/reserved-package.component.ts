import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  styleUrls: ['./reserved-package.component.css'],
})
export class ReservedPackageComponent implements OnInit {

  map: any;
  marker: any;
  holidayPackage: HolidayPackage | undefined;
  restaurants: Restaurant[] = [];
  hotel: Hotel | undefined;
  guide: Guide | undefined;
  showMap: boolean = false;
  street: string | undefined;
  houseNumber: number | undefined;

  constructor(
    private hcs: HolidayCardService,
    private hps: HolidayPackageService,
    private rs: ReservationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.rs.hotel$.subscribe({
      next: hotel => this.hotel = hotel,
      error: e => console.log(e),
    });

    this.rs.guide$.subscribe({
      next: guide => this.guide = guide,
      error: e => console.log(e)
    });

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

  showMapFunction(lat: number, lng: number, street: string, houseNumber: number): void {
    this.street = street;
    this.houseNumber = houseNumber;
    this.showMap = true;
    this.cdr.detectChanges(); // Forza il rilevamento delle modifiche

    const todoMap = document.getElementById('map');
    if (!this.map && todoMap) {
      this.map = L.map(todoMap).setView([lat, lng], 19);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(this.map);
      this.marker = L.marker([lat, lng]).addTo(this.map);
    } else {
      this.updateMap(lat, lng);
    }
    if (todoMap) {
      todoMap.style.display = 'block';
      this.map.invalidateSize();
    }
  }

  updateMap(lat: number, lng: number): void {
    if (this.map) {
      this.map.setView([lat, lng], 19);
      if (this.marker) {
        this.marker.setLatLng([lat, lng]);
      } else {
        this.marker = L.marker([lat, lng]).addTo(this.map);
      }
    }
  }

  goToAttraction(av: AttractionVisit) {
    this.hcs.setAttraction(av);
    this.router.navigate(['/attraction']);
  }
}
