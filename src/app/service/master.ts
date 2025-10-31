import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, switchMap, map, concatMap } from 'rxjs';
import { CompetationModel,Project,RegisterModel } from '../models/competation';


@Injectable({
  providedIn: 'root',
})
export class Master {
  $loginDone: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient) {}

  // onSaveCompetition(data: CompetationModel) {
  //   return this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/competition", data);
  // }

 

 onSaveCompetation(data: CompetationModel): Observable<any> {
  return this.http.get<CompetationModel[]>('http://localhost:3000/competition').pipe(
    map((competitions) => {
      const validIds = competitions
        .map((item) => item.CompetationId)
        .filter((id): id is number => typeof id === 'number')
        .sort((a, b) => a - b);

      const maxId = validIds.length ? validIds[validIds.length - 1] : 0;
      const nextId = maxId + 1;

      return { ...data, CompetationId: nextId, id: nextId };
    }),
    concatMap((newData) => {
      console.log('Posting Competition:', newData);
      return this.http.post('http://localhost:3000/competition', newData).pipe(
        map(() => newData.CompetationId)  // ✅ return only the new ID
      );
    })
  );
}

onSubmitProject(data: any) {
  return this.http.get<Project[]>('http://localhost:3000/project').pipe(
    map((projects) => {

      // Generate ONLY submissionId, NOT CompetationId
      const validIds = projects
        .map((item) => item.submissionId)
        .filter((id): id is number => typeof id === 'number' && !isNaN(id))
        .sort((a, b) => a - b);

      const maxId = validIds.length ? validIds[validIds.length - 1] : 0;
      const nextId = maxId + 1;

      // ✅ Keep the existing CompetationId coming from the form
      return { 
        ...data,
        submissionId: nextId,
        id: nextId
      };
    }),
    concatMap((newData) => {
      return this.http.post('http://localhost:3000/project', newData);
      console.log(newData);
    })
  );
}

registerUser(data: RegisterModel): Observable<any> {
  return this.http.get<RegisterModel[]>('http://localhost:3000/register').pipe(
    map(users => {
      const validIds = users
        .map(u => u.userId)
        .filter((id): id is number => typeof id === 'number' && !isNaN(id))
        .sort((a, b) => a - b);

      const maxId = validIds.length ? validIds[validIds.length - 1] : 0;
      const nextId = maxId + 1;

      return { ...data, userId: nextId,id: nextId };
    }),
    switchMap(newUser => this.http.post('http://localhost:3000/register', newUser))
  );
}

getallCompetition()
{
  return this.http.get<CompetationModel[]>("http://localhost:3000/competition")
}

getallsubmissionByCompetationId(CompetationId:number)
{
  return this.http.get<Project[]>("http://localhost:3000/project/");
}



  
//   loginUser(email: string, password: string): Observable<any> {
//   return this.http.get<any[]>('http://localhost:3000/register').pipe(
//     map(users => {
//       const matchedUser = users.find(user =>
//         user.email === email && user.password === password
//       );
//       if (!matchedUser) {
//         throw new Error('Invalid credentials');
//       }
//       return matchedUser;
//     })
//   );
// }

  //  getUsers(): Observable<User[]> { //   return this.http.get<User[]>(http://localhost:3000/users); // } // Id is taking sequencially(working) //   addUser(user: any): Observable<any> { //   return this.http.get<any[]>(http://localhost:3000/users).pipe( //     map(users => { //       const maxId = users.reduce((max, u) => Math.max(max, +u.id), 0); //       return { ...user, id: (maxId + 1).toString() }; //     }), //     switchMap(newUser => this.http.post(this.apiUrl, newUser)) //   ); // }
}
