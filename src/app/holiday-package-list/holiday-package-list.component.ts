import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HolidayPackageService } from '../service/holiday-package.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HolidayPackage } from '../model/holiday-package.model';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';

@Component({
  selector: 'app-holiday-package-list',
  standalone: true,
  imports: [FormsModule, HolidayCardComponent, RouterLink],
  templateUrl: './holiday-package-list.component.html',
  styleUrl: './holiday-package-list.component.css'
})
export class HolidayPackageListComponent implements OnInit{
  
  cities: string [] = [];
  holidayPackages: HolidayPackage [] = [];

  constructor(
    private holidayPackageService: HolidayPackageService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.holidayPackageService.getCities().subscribe({
      next: (data => this.cities = data),
      error: (error => console.log(error)),
      complete: (() => console.log("tutto fatto!"))
    });
  }

  onSubmit(form: NgForm): void{
    console.log("ciao");
    this.holidayPackageService.getPackagesByCity(form.value.city).subscribe({
      next: data => {
        this.holidayPackages = data;
        console.log(data);
    },
      error: error => console.log(error),
      complete: () => console.log("bene!")
    })
  }
}
