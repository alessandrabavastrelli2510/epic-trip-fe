import { Injectable} from "@angular/core";
import { Faq } from "../model/faq.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class FaqService {

    private faqUrl = 'http://localhost:8080/faq'

    constructor(private http: HttpClient) {

    }

    getFaq(): Observable<Faq[]>{
        return this.http.get<Faq[]>(`${this.faqUrl}`);
      }
  }