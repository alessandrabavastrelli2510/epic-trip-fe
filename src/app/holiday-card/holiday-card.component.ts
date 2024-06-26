import { Component, Input } from '@angular/core';
import { HolidayPackage } from '../model/holiday-package.model';
import { Router, RouterModule } from '@angular/router';
import { AttractionVisitCardComponent } from '../attraction-visit-card/attraction-visit-card.component';
import { AttractionVisit } from '../model/attraction-visit.model';
import { HolidayCardService } from '../service/holiday-card.service';

@Component({
  selector: 'app-holiday-card',
  standalone: true,
  imports: [RouterModule, AttractionVisitCardComponent],
  templateUrl: './holiday-card.component.html',
  styleUrl: './holiday-card.component.css'
})
export class HolidayCardComponent {
  @Input("package") holidayPackage: HolidayPackage | undefined;
  @Input("fromSurvey") fromSurvey: boolean = false;
  @Input("fromSearch") fromSearch: boolean = false;
  attraction: AttractionVisit | undefined;


  constructor( private hcs: HolidayCardService, private router: Router ){}


  goToAttraction(av: AttractionVisit){
    this.hcs.setAttraction(av);
    this.router.navigate(['/attraction'], {state: { fromSurvey: this.fromSurvey, fromSearch: this.fromSearch }});
  }

  goToReservation(hp: HolidayPackage){
    this.hcs.setPackage(hp);
    this.router.navigate(['/payment']);
  }

}





















//     id: 49,
//     packageDuration: 3,
//     packageType: "adventure",
//     country: "USA",
//     city: "New York",
//     priceRange: "$",
//     title: "Avventura a New York 3 Giorni - $",
//     description: "Un viaggio avventuroso attraverso le strade affollate di New York in 3 giorni.",
//     maxPeopleCount: 10,
//     imagePath: "cane",
//     attractionVisits: [
//         {
//             id: 127,
//             attractionId: 13,
//             attractionName: "Central Park",
//             attractionDescription: "Un vasto parco urbano nel cuore di Manhattan.",
//             attractionOrder: 1,
//             visitDay: 1
//         },
//         {
//             id: 128,
//             attractionId: 14,
//             attractionName: "Guggenheim",
//             attractionDescription: "Un famoso museo d'arte moderna.",
//             attractionOrder: 2,
//             visitDay: 1
//         },
//         {
//             id: 129,
//             attractionId: 43,
//             attractionName: "City Climb Skyscraping",
//             attractionDescription: "Raggiungi nuove vette quando sei a New York City con questo biglietto per l'attrazione City Climb.",
//             attractionOrder: 3,
//             visitDay: 1
//         },
//         {
//             id: 130,
//             attractionId: 17,
//             attractionName: "Bryant Park",
//             attractionDescription: "Un parco pubblico situato nel centro di Manhattan.",
//             attractionOrder: 4,
//             visitDay: 2
//         },
//         {
//             id: 131,
//             attractionId: 18,
//             attractionName: "Chrysler Building",
//             attractionDescription: "Un iconico grattacielo art déco.",
//             attractionOrder: 5,
//             visitDay: 2
//         },
//         {
//             id: 132,
//             attractionId: 44,
//             attractionName: "Tour in elicottero",
//             attractionDescription: "Tour per tutta Manhattan in elicottero" ,
//             attractionOrder: 6,
//             visitDay: 2
//         },
//         {
//             id: 133,
//             attractionId: 21,
//             attractionName: "Flatiron",
//             attractionDescription: "Un edificio iconico di forma triangolare.",
//             attractionOrder: 7,
//             visitDay: 3
//         },
//         {
//             id: 134,
//             attractionId: 22,
//             attractionName: "Ponte di Brooklyn",
//             attractionDescription: "Un ponte sospeso che collega Manhattan a Brooklyn.",
//             attractionOrder: 8,
//             visitDay: 3
//         },
//         {
//             id: 135,
//             attractionId: 45,
//             attractionName: "Graffiti",
//             attractionDescription: "Laboratorio di graffiti a Brooklyn con un artista locale",
//             attractionOrder: 9,
//             visitDay: 3
//         }
//     ]
