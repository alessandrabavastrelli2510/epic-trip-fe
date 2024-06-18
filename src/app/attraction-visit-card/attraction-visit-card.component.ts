import { Component, OnInit } from '@angular/core';
import { AttractionVisit } from '../model/attraction-visit.model';
import { HolidayCardService } from '../service/holiday-card.service';
import { Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';



@Component({
  selector: 'app-attraction-visit-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './attraction-visit-card.component.html',
  styleUrl: './attraction-visit-card.component.css'
})

export class AttractionVisitCardComponent implements OnInit{
  attractionVisit: AttractionVisit | undefined;
  fromSurvey: boolean = false;
  fromSearch: boolean = false;

  constructor(private hcs: HolidayCardService, private router: Router, private location: Location){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.fromSurvey = navigation.extras.state['fromSurvey'];
      this.fromSearch = navigation.extras.state['fromSearch'];
    }
  }

  ngOnInit(): void {
    this.hcs.attraction$.subscribe({
      next: attraction => {
        this.attractionVisit = attraction;
        console.log(this.attractionVisit);
      },
      error: err => console.log("errore nel passaggio di attrazione", err)
    });
    console.log(this.attractionVisit);
  } 

  goBackToSearchResult():void{
    this.router.navigate(['search'], {state: { showResult: true, city: this.attractionVisit?.city}});
  }

  goBackToCard(): void{
    this.router.navigate(['showSurvey'], {state: { showResult: true , packageId: this.attractionVisit?.packageId }});
  }

  goBackToReservation(): void{
    this.location.back();
  }
}

