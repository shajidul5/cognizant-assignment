import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

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
      this.combinedUser["user2"] = users[1];
      console.log("this is the combined users after parallel http requests: ");
      console.log(this.combinedUser);
    })
  }

  sequential(){
    let ids = from([1, 2]);
    ids.pipe(mergeMap(id => this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`))).subscribe(user => {
      this.combinedUser[`user${user.id}`] = user;
      console.log("This is the combined user: "); 
      console.log(this.combinedUser);
    });
  }

  getOne(id){
    return this.http.get('https://jsonplaceholder.typicode.com/users/'+id);
  }
}
