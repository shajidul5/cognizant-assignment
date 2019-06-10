import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  combineduser: {};

  constructor(private http: HttpClient) { }
  
  paralell(){
    return 
  }
}
