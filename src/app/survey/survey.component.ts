import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Questions } from '../model/survey.model';
import { HolidayPackageService } from '../service/holiday-package.service';
@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit{
  minDate: string = "";
  errorMessage: string | null = null;
  selectedDate: string = "";
  questions: Questions[] = [];
  cities: string[] = [];

  constructor(private holidayPackageService: HolidayPackageService){

  }

  ngOnInit(): void {
    this.holidayPackageService.getQuestions().subscribe({
      next: questions => this.questions = questions,
      error: err => console.log('errore nel caricamento delle domande', err)
    })
    this.holidayPackageService.cities$.subscribe(cities => this.cities = cities);
    this.holidayPackageService.getCities();
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2,'0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }
  validateDate(event: Event): void{
    const input = (event.target as HTMLInputElement).value;
    const selectedDate = new Date(input);
    const today = new Date();

    this.errorMessage = null;

    if(selectedDate < new Date(today.setHours(0,0,0,0))){
      this.errorMessage = 'La data selezionata è previa ad oggi';
      alert(this.errorMessage);
      this.selectedDate = '';
    }
    
  }
  onSubmit(form: NgForm){
    console.log(form);
  }

    
}



