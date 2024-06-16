import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Login } from '../model/login.model';
import { UserService } from '../service/user.service';
import { Route, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService:UserService,private router:Router){

  }
  onSubmit(form:NgForm){
    const loginInfo:Login={
      ...form.value
    };
    this.userService.login(loginInfo).subscribe({
      next:(res)=>{
      localStorage.setItem('token', res.token);
      this.router.navigate(['']);

    },
    error: (err)=> {
      console.log(err);
    }});

  }
}
