import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HolidayPackageListComponent } from '../holiday-package-list/holiday-package-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,HolidayPackageListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
}
