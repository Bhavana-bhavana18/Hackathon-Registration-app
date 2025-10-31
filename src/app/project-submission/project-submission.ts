import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Master } from '../service/master';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-submission',
  imports: [DatePipe,RouterLink],
  templateUrl: './project-submission.html',
  styleUrl: './project-submission.css'
})
export class ProjectSubmission {
  currentCompetationId: number = 0;
   masterService = inject<any>(Master);
   submissionList: any[] = [];
   
constructor(private activateroute: ActivatedRoute) {
  this.activateroute.params.subscribe((res: any) => {
      console.log(res);
      this.currentCompetationId = res.id;
      this.getAllSubmissions()
    });
}
getAllSubmissions()
{
this.masterService.getallsubmissionByCompetationId(this.currentCompetationId).subscribe((res:any) =>{
  this.submissionList = res;
})
}

}
