import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { Master } from '../../service/master';
import { RegisterModel } from '../../models/competation';
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

  registerObj: RegisterModel = {
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
    this.masterService.registerUser(this.registerObj).subscribe(
      {
        next: (res: any) => {
          alert("Registration Successful");
          console.log('register:', res)
        },
        error: (error:any) => 
          {
            alert(error.error);
          }  
      }
    )
  } 
  
// onLogin()
//   {
//     this.http.post("https://api.freeprojectapi.com/api/ProjectCompetition/login",this.loginObj).subscribe(
//       {
//         next: (result: any) => {
//           localStorage.setItem("hackathonuser", JSON.stringify(result));
//           this.router.navigate(['/home']);
//           this.masterService.$loginDone.next();
//           alert("Login Successful");
//         },
//         error: (error:any) => 
//           {
//             alert(error.error);
//           }  
//       }
//     )
//   }


onLogin()
  {
    this.http.get("http://localhost:3000/register").subscribe(
    (users:any[]) => {
      const user = users.find(u => 
        u.email === this.loginObj.email && 
        u.password === this.loginObj.password
      );

      if (user) {
        localStorage.setItem("register", JSON.stringify(user));
        this.router.navigate(["/home"]);
        this.masterService.$loginDone.next();
        alert("Login Successful!");
      } else {
        alert("Invalid email or password.");
      }
    },
    (error:any) => {
      alert("Server error: " + error.message);
    }
  );

  }



// onLogin() {
//   const email = this.masterService.email;
//   const password = this.masterService.password;

//   this.masterService.loginUser(email, password).subscribe({
//     next: (user:any) => {
//       localStorage.setItem('register', JSON.stringify(user));
//       this.router.navigate(['/home']);
//       this.masterService.loginDone.next();
//       alert('Login Successful');
//     },
//     error: (err:any) => {
//       alert(err.message || 'Login Failed');
//     }
//   });
// }

}
