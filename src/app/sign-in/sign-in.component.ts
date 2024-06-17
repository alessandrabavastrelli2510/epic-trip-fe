import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';
import { Router, RouterModule } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { SignIn as SignIn } from '../model/sign-in.model';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit{
  // currentUser2:User = {
  //   firstname: "",
  //   lastname: "",
  //   birthdate: new Date(Date.now()),
  //   telephoneNumber: "",
  //   country: "",
  //   city: "",
  //   street: "",
  //   houseNumber: 0 ,
  //   postalCode: "" ,
  //   email: "",
  // } 
  maxDate: string = "";
  sDate: string = "";
  errorMessage: string | null = null;

  constructor(private signInService: UserService, private router: Router){}
  ngOnInit(): void {
    const today = new Date();
    const year = today.getFullYear();
    const newYear = year-18;
    const month = (today.getMonth() + 1).toString().padStart(2,'0');
    const day = today.getDate().toString().padStart(2, '0');
    this.maxDate = `${newYear}-${month}-${day}`;

    
  }

  validateDate(event: Event): void{
    const input = (event.target as HTMLInputElement).value;
    const selectedDate = new Date(input);

    this.errorMessage = null;
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2,'0');
    const day = selectedDate.getDate().toString().padStart(2, '0');
    this.sDate = `${year}-${month}-${day}`;

    if(this.sDate>this.maxDate){
      this.errorMessage = 'La data selezionata è previa ad oggi';
      alert(this.errorMessage);
      this.sDate = '';
    }
    
  }


  onSubmit(form :NgForm){
    const currentUser: User ={
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      birthdate: form.value.birthdate,
      telephoneNumber: form.value.telephoneNumber,
      country: form.value.country,
      city: form.value.city,
      street: form.value.street,
      houseNumber: form.value.houseNumber,
      postalCode: form.value.postalCode,
      email: form.value.email,

      };
    // const currentUser: User={
    //   ...form.value
    // }
      
    const signInUser: SignIn={
      user: currentUser,
      password: form.value.password
    }

    // this.signInService.saveUser(signInUser).pipe(
    //   tap(() => {
    //     this.router.navigate(['']);
    //   }),
    //   catchError((err: any) => {
    //     return of(null);
    //   })
    // ).subscribe();

    this.signInService.saveUser(signInUser).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error:(err: string) => {
        console.log(err);
      }});


  }
}
