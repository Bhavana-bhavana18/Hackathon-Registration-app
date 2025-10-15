import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CompetationModel } from '../../models/competation';
import { Master } from '../../service/master';
// import { User } from '../../models/competation';
import { map } from 'rxjs';
import { error } from 'console';

@Component({
  selector: 'app-events',
  imports: [FormsModule],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
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
  // user: User = {
  //   name: '',
  //   email: '',
  // };

  onSave() {
    this.masterService.onSaveCompetition(this.competationObj).subscribe({
      next: (res: any) => {
        alert('Competition created successfully!');
      },
      error: (err: any) => {
        console.error(err);
        alert(err.message || 'Unknown error occurred.');
      },
    });
  }

  // ngOnInit() {
  //   this.masterService.getUsers().subscribe((res: any) => {
  //     console.log(res);
  //   });
  // }
  // onSubmit() {

  //   this.masterService.addUser(this.user)
  //   .subscribe({
  //     next: () => {
  //       alert('Competition created successfully!');
  //     },
  //     error: (err:any) => {
  //       console.error('Error adding user:', err);
  //       alert(err.message || 'Failed to add user.');

  //     }
  //   });
  // }
}
