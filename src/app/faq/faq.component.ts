import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaqService } from '../service/faq.service';
import { Faq } from '../model/faq.model';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit {
  faqs: Faq[] = [];

  constructor(private faqService: FaqService){

  }
  ngOnInit(): void {
    this.faqService.getFaq().subscribe({
      next: data => this.faqs = data,
      error: error => console.log(error),
      complete: () => console.log("faq andate!")
    })
  
  }
  


}
