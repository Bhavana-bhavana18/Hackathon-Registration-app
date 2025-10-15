import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap } from 'rxjs';
// import { CompetationModel,User } from '../models/competation';
import { CompetationModel } from '../models/competation';


// export interface User {
//   id: number;
//   name: string;
//   email: string;
// }


@Injectable({
  providedIn: 'root'
})
export class Master {
  $loginDone: Subject<void> = new Subject<void>;
  apiUrl = 'http://localhost:3000/users';
  constructor( private http: HttpClient) { }

  onSaveCompetition(data: CompetationModel) {
    return this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/competition", data);
  }

  //  getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUrl);
  // }
 
  //  addUser(user: User): Observable<User> {

  //   return this.http.post<User[]>(this.apiUrl,user).pipe(
  //   switchMap(users => {
  //     const nextId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;
  //     const newUser = { ...users, id: nextId };
  //     return this.http.post<User>(this.apiUrl, newUser);
  //   })
  // );
  // }

    // addUser(user: User): Observable<User> {
    //   return this.http.post<User>(this.apiUrl, user);
    // }
}
