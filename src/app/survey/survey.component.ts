import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  questions: string[] = [];
  onSubmit(form: NgForm){

  }
}



