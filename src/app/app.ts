import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';
import { Master } from './service/master';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('HACKATHON_RREGISTRATION_APP');
  loggedData:any;
  masterService = inject<any>(Master);
  constructor() {
    this.reloadData();
    
  this.masterService.$loginDone.subscribe((res:any) => {
      this.reloadData(); 
  });
   }
   reloadData()
   {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const localData = localStorage.getItem("register");
    if(localData != null ) {
      this.loggedData = JSON.parse(localData);
    }
  }
   }
    logOut()
    {
      localStorage.removeItem("register");
      this.loggedData = undefined;
    }

}
