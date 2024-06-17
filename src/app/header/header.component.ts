import { Component, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule} from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private userService: UserService){   
  }

  ngOnInit(): void {
    this.isLogged = this.isLoggedIn();
    
  }

  isLoggedIn(){
    if(localStorage.getItem("token")){
      return true;
    } else {
    return false;
    }
  }
  
  logOut(){
    localStorage.removeItem("token");
    this.isLogged = this.isLoggedIn();
  }
}
