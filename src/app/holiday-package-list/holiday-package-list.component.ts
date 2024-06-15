import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HolidayPackageService } from '../holiday-package.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-holiday-package-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './holiday-package-list.component.html',
  styleUrl: './holiday-package-list.component.css'
})
export class HolidayPackageListComponent implements OnInit{
  
  cities: string [] = [];

  constructor(private holidayPackageService: HolidayPackageService){}

  ngOnInit(): void {
    this.holidayPackageService.getCities().subscribe({
      next: (data => this.cities = data),
      error: (error => console.log(error)),
      complete: (() => console.log("tutto fatto!"))
    });
  }

  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
