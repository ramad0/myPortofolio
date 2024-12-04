import { Component, OnInit } from '@angular/core';
import { ExperienceService } from '../Services_/experience.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-experience',
  templateUrl: './dashboard-experience.component.html',
  styleUrls: ['./dashboard-experience.component.css']
})
export class DashboardExperienceComponent implements OnInit {
  experiences: any[] = [];

  experienceForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    experience_company_name: new FormControl(''),
    experience_profession: new FormControl(''),
    experience_date: new FormControl(''),
    experience_disc: new FormControl(''),
  });

  constructor(private _experienceS: ExperienceService) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences() {
    this._experienceS.getExperiences().subscribe(
      data => {
        this.experiences = data;
      },
      error => {
        console.error('Error loading experiences:', error);
      }
    );
  }

  addExperience() {
    if (this.experienceForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    let formData = new FormData();
    formData.append('experience_company_name', this.experienceForm.get('experience_company_name')?.value);
    formData.append('experience_profession', this.experienceForm.get('experience_profession')?.value);
    formData.append('experience_date', this.experienceForm.get('experience_date')?.value);
    formData.append('experience_disc', this.experienceForm.get('experience_disc')?.value);

    this._experienceS.addExperience(formData).subscribe(
      data => {
        console.log('Data added:', data);
        this.loadExperiences();
        this.experienceForm.reset();
      },
      error => {
        console.error('Error adding experience:', error);
      }
    );
  }

  updateExperience(_id: string) {
    if (this.experienceForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    let formData = new FormData();
    formData.append('experience_company_name', this.experienceForm.get('experience_company_name')?.value);
    formData.append('experience_profession', this.experienceForm.get('experience_profession')?.value);
    formData.append('experience_date', this.experienceForm.get('experience_date')?.value);
    formData.append('experience_disc', this.experienceForm.get('experience_disc')?.value);

    this._experienceS.updateExperience(_id, formData).subscribe(
      data => {
        console.log('Experience updated:', data);
        this.loadExperiences();
        this.experienceForm.reset();
      },
      error => {
        console.error('Error updating experience:', error);
      }
    );
  }


  deleteExperience(_id: string) {
    this._experienceS.deleteExperience(_id).subscribe(
      data => {
        console.log('Experience deleted:', data);
        this.loadExperiences();
      },
      error => {
        console.error('Error deleting experience:', error);
      }
    );
  }

  editExperience(experience: any) {
    this.experienceForm.setValue({
      _id: experience._id, 
      experience_company_name: experience.experience_company_name,
      experience_profession: experience.experience_profession,
      experience_date: experience.experience_date,
      experience_disc: experience.experience_disc,
    });
  }
}
