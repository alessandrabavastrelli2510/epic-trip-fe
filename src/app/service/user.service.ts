import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { SignIn } from '../model/sign-in.model';
import { Login } from '../model/login.model';
import { TokenResponse } from '../model/token-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/register';
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  saveUser(user: SignIn): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}register`, user);;
  }
  login(loginInfo:Login): Observable<TokenResponse>{
    return this.http.post<TokenResponse>(`${this.baseUrl}login`,loginInfo);

  }
}
