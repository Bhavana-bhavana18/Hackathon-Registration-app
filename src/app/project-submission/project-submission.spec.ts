import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSubmission } from './project-submission';

describe('ProjectSubmission', () => {
  let component: ProjectSubmission;
  let fixture: ComponentFixture<ProjectSubmission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSubmission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSubmission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
