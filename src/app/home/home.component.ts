import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HolidayPackageListComponent } from '../holiday-package-list/holiday-package-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,HolidayPackageListComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSlide = 0;
  totalSlides = 3;

  ngOnInit() {
    this.initCarousel();
  }

  initCarousel() {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    }, 5000);
  }

}
