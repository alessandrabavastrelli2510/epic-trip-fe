import { Component, OnInit } from '@angular/core';

import { HolidayCardService } from '../service/holiday-card.service';
import { HolidayPackage } from '../model/holiday-package.model';
import { AttractionVisit } from '../model/attraction-visit.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reserved-package',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reserved-package.component.html',
  styleUrl: './reserved-package.component.css'
})
export class ReservedPackageComponent implements OnInit {
  holidayPackage: HolidayPackage | undefined;

  constructor(private hcs: HolidayCardService, private router: Router){}

  ngOnInit(): void {
    this.hcs.holidayPackage$.subscribe({
      next: hPackage => this.holidayPackage = hPackage,
      error: err => console.log("errore nel passaggio di pacchetto", err)
    });
    console.log(this.holidayPackage);
  }

  goToAttraction(av: AttractionVisit){
    this.hcs.setAttraction(av);
    this.router.navigate(['/attraction']);
  }

}
