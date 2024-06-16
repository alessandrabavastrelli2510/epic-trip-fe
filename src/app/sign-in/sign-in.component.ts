import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../model/user.model';
import { SignInService } from '../service/sign-in.service';
import { Router, RouterModule } from '@angular/router';
import { catchError, of, tap } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private signInService: SignInService, private router: Router){}

  onSubmit(form :NgForm){
    const currentUser: User ={
      firstname: form.value.username,
      lastname: form.value.lastname,
      birthdate: form.value.birthdate,
      telephoneNumber: form.value.telephoneNumber,
      country: form.value.country,
      city: form.value.city,
      street: form.value.street,
      houseNumber: form.value.houseNumber,
      postalCode: form.value.postalCode,
      email: form.value.email,
      gender: form.value.gender,
      password: form.value.password
    }

    this.signInService.saveUser(currentUser).pipe(
      tap(() => {
        this.router.navigate(['']);
      }),
      catchError((err: any) => {
        return of(null);
      })
    ).subscribe();
  }
}
