import { Injectable} from "@angular/core";
import { faq } from "../model/faq.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class FaqService {

    private faqUrl = 'http://localhost:8080/faq'

    constructor(private http: HttpClient) {

    }

    getFaq(): Observable<string[]>{
        return this.http.get<string[]>(`${this.faqUrl}/faq`);
      }
  }