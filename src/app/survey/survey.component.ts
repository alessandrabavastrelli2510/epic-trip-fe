import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Questions } from '../model/survey.model';
import { HolidayPackageService } from '../service/holiday-package.service';
import { SurveyModel } from '../model/survey-form.model';
import { HolidayPackage } from '../model/holiday-package.model';
import { Router } from '@angular/router';
import { HolidayCardComponent } from '../holiday-card/holiday-card.component';
import { Answer } from '../model/answer.model';
import { FullSurveyModel } from '../model/full-survey.model';
import { ReservationService } from '../service/reservation.service';
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
  

  constructor(private holidayPackageService: HolidayPackageService, private rs: ReservationService ,private router: Router ){
    const navigation = this.router.getCurrentNavigation();
    if(navigation?.extras.state){
      this.showResult = navigation.extras.state['showResult'];
      this.holidayPackageService.getPackageById(navigation.extras.state['packageId']).subscribe({
        next: p => this.holidayPackage = p,
        error: e => console.log(e)
      });
    }

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

  getRadioButton(name: string): HTMLInputElement{
    return document.querySelector(`input[name=${name}]:checked`) as HTMLInputElement;
  }

  onSubmit(form: NgForm){
    
    const cityAnswer: Answer = {
      questionId: this.getRadioButton("cities").getAttribute("data-question-id")!,
      answer: form.value.cities
    }
  
    const numPeopleAnswer: Answer = {
      questionId: document.getElementById("numPeople")?.getAttribute("data-question-id")!,
      answer: form.value.numPeople
    }

    const startDateAnswer: Answer = {
      questionId: document.getElementById("startDate")?.getAttribute("data-question-id")!,
      answer: form.value.startDate
    }

    const packageDurationAnswer: Answer = {
      questionId: this.getRadioButton("days").getAttribute("data-question-id")!,
      answer: form.value.days
    }

    const packageTypeAnswer: Answer ={ 
      questionId: this.getRadioButton("types").getAttribute("data-question-id")!,
      answer: form.value.types
    }

    const priceRangeAnswer: Answer = {
      questionId: this.getRadioButton("cost").getAttribute("data-question-id")!,
      answer: form.value.cost
    }

    const fullAnswers: Answer[] = [cityAnswer, numPeopleAnswer, startDateAnswer, packageDurationAnswer,
                                    packageTypeAnswer, priceRangeAnswer];

    const answers : SurveyModel = {
      city : form.value.cities,
      numPeople : form.value.numPeople,
      startDate : form.value.startDate,
      packageDuration: Number(form.value.days),
      packageType: form.value.types,
      priceRange: form.value.cost
    };
    
    this.holidayPackageService.saveSurveyAnswers(fullAnswers).subscribe({
      next: as => console.log(as),
      error: e => console.log(e)
    })
    
    this.holidayPackageService.getPackageByAnswers(answers).subscribe({
      next: pack => {
        this.holidayPackage = pack;
        this.showResult=true;
      },
      error: (err) => console.log(err)
    });

    this.rs.setNumPeople(form.value.numPeople);
    this.rs.setStartDate(form.value.startDate);
    this.rs.setDays(Number(form.value.days));
  }
  backToSurvey():void{

    this.showResult=false;
  }
}



