import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Master } from '../../service/master';
// import { json } from 'node:stream/consumers';


@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  isLoginFormVisible = signal<boolean>(false);
  http = inject<any>(HttpClient);
  router = inject<any>(Router);
  masterService = inject<any>(Master);

  registerObj: any = {
    "fullName": '',
    "email": '',
    "password": '',
    "collageName": '',
    "role": '',
  };
  loginObj: any = {
    "email": '',
    "password": ''
  };
  toggleForm() {
    this.isLoginFormVisible.set(!this.isLoginFormVisible());
  }
  onRegister() 
  {
    this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/register", this.registerObj).subscribe(
      {
        next: (result: any) => {
          alert("Registration Successful");
        },
        error: (error:any) => 
          {
            alert(error.error);
          }  
      }
    )
  } 
  
onLogin()
  {
    this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/login", this.loginObj).subscribe(
      {
        next: (result: any) => {
          localStorage.setItem("hackathonuser", JSON.stringify(result));
          this.router.navigate(['/home']);
          this.masterService.$loginDone.next();
          alert("Login Successful");
        },
        error: (error:any) => 
          {
            alert(error.error);
          }  
      }
    )
  }
}
