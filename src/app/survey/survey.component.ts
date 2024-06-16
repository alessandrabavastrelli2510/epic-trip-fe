import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Questions } from '../model/survey.model';
import { HolidayPackageService } from '../service/holiday-package.service';
import { SurveyModel } from '../model/survey-form.model';
import { HolidayPackage } from '../model/holiday-package.model';
import { Router } from '@angular/router';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';
@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule,HolidayCardComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent implements OnInit{
  minDate: string = "";
  errorMessage: string | null = null;
  selectedDate: string = "";
  questions: Questions[] = [];
  cities: string[] = [];
  types: string[] = [];
  holidayPackage: HolidayPackage | undefined;
  showResult = false;
  

  constructor(private holidayPackageService: HolidayPackageService, private router: Router ){


  }

  ngOnInit(): void {

    this.holidayPackageService.getQuestions().subscribe({
      next: questions => this.questions = questions,
      error: err => console.log('errore nel caricamento delle domande', err)
    })

    this.holidayPackageService.getTypes().subscribe({
      next: types => this.types = types,
      error: err => console.log('errore nel caricamento dei tipi', err)
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
    
    const answers : SurveyModel = {
      city : form.value.cities,
      numPeople : form.value.numPeople,
      startDate : form.value.startDate,
      packageDuration: Number(form.value.days),
      packageType: form.value.types,
      priceRange: form.value.cost
    };

    
    this.holidayPackageService.getPackageByAnswers(answers).subscribe({
      next: pack => {
        this.holidayPackage = pack;
        this.showResult=true;
      },
      error: (err) => console.log(err)
    });
  }
  backToSurvey():void{

    this.showResult=false;
  }
}



