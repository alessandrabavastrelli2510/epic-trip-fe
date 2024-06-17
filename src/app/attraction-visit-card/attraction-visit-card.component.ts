import { Component, OnInit } from '@angular/core';
import { AttractionVisit } from '../model/attraction-visit.model';
import { HolidayCardService } from '../service/holiday-card.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-attraction-visit-card',
  standalone: true,
  imports: [],
  templateUrl: './attraction-visit-card.component.html',
  styleUrl: './attraction-visit-card.component.css'
})

export class AttractionVisitCardComponent implements OnInit{
  attractionVisit: AttractionVisit | undefined;

  constructor(private hcs: HolidayCardService, private location: Location){}

  ngOnInit(): void {
    this.hcs.attraction$.subscribe({
      next: attraction => this.attractionVisit = attraction,
      error: err => console.log("errore nel passaggio di attrazione", err)
    });
    console.log(this.attractionVisit);
  } 

  goBack():void{
    this.location.back();
  }
}

