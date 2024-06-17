import { Component, OnInit } from '@angular/core';
import { HolidayCardService } from '../service/holiday-card.service';
import { HolidayPackage } from '../model/holiday-package.model';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  


  constructor(private hcs: HolidayCardService, private router: Router){}


  onSubmit(form: NgForm){
    console.log(form.value);
    this.router.navigate(['/reserved-package'])
  }

}
