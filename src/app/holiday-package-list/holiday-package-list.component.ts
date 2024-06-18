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
  types: string [] = [];
  holidayPackages: HolidayPackage [] = [];
  city: string = '';

  constructor(
    private holidayPackageService: HolidayPackageService,
    private route: ActivatedRoute,
    private router: Router
  ){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.city = navigation.extras.state['city'];
    }
  }

  ngOnInit(): void {
    // this.holidayPackageService.getCities().subscribe({
    //   next: (data => this.cities = data),
    //   error: (error => console.log(error)),
    //   complete: (() => console.log("tutto fatto!"))
    // });

    this.holidayPackageService.cities$.subscribe(cities => this.cities = cities);
    this.holidayPackageService.getCities();
    
    this.holidayPackageService.getTypes().subscribe({
      next: (data => this.types = data),
      error: (error => console.log(error)),
      complete: (() => console.log("tutto bene!"))
    });

    if(this.city){
      this.searchPackagesByCity(this.city);
    }
    
  }

  searchPackagesByCity(city: string){
    this.holidayPackageService.getPackagesByCity(city).subscribe({
      next: data => {
        this.holidayPackages = data;
    },
      error: error => console.log(error),
      complete: () => console.log("bene!")
    })
  }

  onSubmit(form: NgForm): void{
    this.searchPackagesByCity(form.value.city);
  }
}
