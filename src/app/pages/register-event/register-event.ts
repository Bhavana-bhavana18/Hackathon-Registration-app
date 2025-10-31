import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Master } from '../../service/master';

@Component({
  selector: 'app-register-event',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register-event.html',
  styleUrl: './register-event.css',
})
export class RegisterEvent implements OnInit{
  //  competitionId!: number;
  submissionForm: FormGroup = new FormGroup({
    submissionId: new FormControl(0),
    userId: new FormControl(0),
    CompetationId: new FormControl(0),
    projectTitle: new FormControl(''),
    description: new FormControl(''),
    githublink: new FormControl(''),
    submissionDate: new FormControl(new Date()),
    status: new FormControl(''),
    rank: new FormControl(''),
  });

  masterService = inject<any>(Master);

  constructor(private activateroute: ActivatedRoute) {}

  ngOnInit() {
      this.activateroute.params.subscribe((res: any) => {
      console.log(res);
      this.submissionForm.controls['CompetationId'].setValue(Number(res.CompetationId));
    });
    const localData = localStorage.getItem('register');
    console.log(localData);
    if (localData != null) {
      const parseData = JSON.parse(localData);
      this.submissionForm.controls['userId'].setValue(parseData.userId);
    }
  }
 
  onSubmit() {
    const formValue = this.submissionForm.value
    this.masterService.onSubmitProject(formValue).subscribe((res:any)=>{
      alert("Registeration Successfully")
    });
  } 
}
