import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetationModel } from '../../models/competation';
import { Master } from '../../service/master';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [FormsModule,DatePipe,RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events implements OnInit{
  //if class is used
  // competationObj: CompetationModel = new CompetationModel();
  //if interface is used 
  competationObj: CompetationModel = {
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: ''
  };
  masterService = inject<any>(Master);
  gridData: CompetationModel [] = [];
  constructor()
  {
    this.getallData();
  }

  onSave() {
    this.masterService.onSaveCompetation(this.competationObj).subscribe({
      next: (res: any) => {
        alert('Competition created successfully!');
       console.log('Saved:', res)
      },
      error: (err: any) => {
        console.error('Error:', err)
        alert(err.message || 'Unknown error occurred.');
      },
    });
  }

  ngOnInit() {
    // this.masterService.getUsers().subscribe((res: any) => {
    //   console.log(res);
    // });
    this.getallData();
  }

getallData()
    {
      this.masterService.getallCompetition().subscribe({
        next:(res:any)=>{
          this.gridData = res;
        }

      })
    }


}
