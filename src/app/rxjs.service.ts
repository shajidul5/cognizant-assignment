import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsService {

  combinedUser = {};

  constructor(private http: HttpClient) { }
  
  paralell(){
    let user1 = this.http.get('https://jsonplaceholder.typicode.com/users/1');
    let user2 = this.http.get('https://jsonplaceholder.typicode.com/users/2');

    forkJoin([user1, user2]).subscribe(users => {
      this.combinedUser["user1"] = users[0];
      this.combinedUser["user2"] = user1[0];
      console.log("this is the combined users after parallel http requests: ");
      console.log(this.combinedUser);
    })
  }

  sequential(){
    this.http.get('https://jsonplaceholder.typicode.com/users/1').subscribe(user1 => {
      this.combinedUser["user1"] = user1;
      this.http.get('https://jsonplaceholder.typicode.com/users/2').subscribe(user2 => {
        this.combinedUser["user2"] = user2;
        console.log("This is the combined users after sequential http requests: ");
        console.log(this.combinedUser);
      })
    })
  }

  getOne(id){
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+id);
  }
}
