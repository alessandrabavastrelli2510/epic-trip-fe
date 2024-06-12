import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HolidayPackage } from '../holiday-package.service';

@Component({
  selector: 'app-holiday-package-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './holiday-package-list.component.html',
  styleUrl: './holiday-package-list.component.css'
})
export class HolidayPackageListComponent implements OnInit{
  url = "http://localhost:8080/package/city";
  cities: string [] = [];
  constructor(private holidayPackageService: HolidayPackage){}
  ngOnInit(): void {
    this.holidayPackageService.getCities().subscribe(data => this.cities = data);
  }
  onSubmit(form: NgForm){
    console.log(form.value);
  }
}
