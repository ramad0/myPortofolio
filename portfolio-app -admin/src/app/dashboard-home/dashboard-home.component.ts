import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { HomeService } from '../Services_/home.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  constructor(private _homeS: HomeService) {}

  homeForm: FormGroup = new FormGroup({
    perfil_fname: new FormControl(''),
    perfil_lname: new FormControl(''),
    perfil_img: new FormControl(null),
    info_name: new FormControl(''),
    info_img: new FormControl(null),
    info_disc: new FormControl(''),
    info_cv: new FormControl(null),
    about_name: new FormControl(''),
    about_job: new FormControl(''),
    about_disc: new FormControl(''),
    about_social_i: new FormArray([]),
    about_social_link: new FormArray([]),
    about_img: new FormControl(null),
    about_note: new FormControl(''),
    skills_items: new FormControl([]),
    skills_disc: new FormControl(''),
  });

  aboutSocialIcons: FormArray = this.homeForm.get('about_social_i') as FormArray;
  aboutSocialLinks: FormArray = this.homeForm.get('about_social_link') as FormArray;
  skillsFiles: File[] = [];
  homeData: any[] = [];
  isEditing: boolean = false;
  editingId: string | null = null;

  ngOnInit() {
    this.loadHomeData();
  }

  loadHomeData() {
    this._homeS.getHome().subscribe(
      data => {
        this.homeData = data;
      },
      error => {
        console.error('Error fetching home data:', error);
      }
    );
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      if (fieldName === 'skills_items') {
        this.skillsFiles.push(...files);
      } else {
        this.homeForm.patchValue({ [fieldName]: files[0] });
      }
    }
  }

  addSocialIcon() {
    this.aboutSocialIcons.push(new FormControl(''));
  }

  addSocialLink() {
    this.aboutSocialLinks.push(new FormControl(''));
  }

  addSkillsFile() {
    this.skillsFiles.push(null as any);
  }

  submitHomeForm() {
    if (this.homeForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const formData = new FormData();
    Object.keys(this.homeForm.value).forEach(key => {
      const value = this.homeForm.get(key)?.value;
      if (value && !Array.isArray(value)) {
        formData.append(key, value);
      }
    });

    this.aboutSocialIcons.controls.forEach(icon => {
      formData.append('about_social_i', icon.value);
    });

    this.aboutSocialLinks.controls.forEach(link => {
      formData.append('about_social_link', link.value);
    });

    this.skillsFiles.forEach(file => {
      if (file) {
        formData.append('skills_items', file);
      }
    });

    if (this.isEditing && this.editingId) {
      this._homeS.updateHome(this.editingId, formData).subscribe(
        response => {
          alert('Home data updated successfully!');
          this.resetForm();
          this.loadHomeData();
        },
        error => {
          console.error('Update failed:', error);
          alert('Failed to update data.');
        }
      );
    } else {
      this._homeS.addHome(formData).subscribe(
        response => {
          alert('Home data added successfully!');
          this.resetForm();
          this.loadHomeData();
        },
        error => {
          console.error('Submission failed:', error);
          alert('Failed to submit data.');
        }
      );
    }
  }

  editHome(data: any) {
    this.isEditing = true;
    this.editingId = data._id; 
    this.homeForm.patchValue({
      perfil_fname: data.perfil_fname,
      perfil_lname: data.perfil_lname,
      info_name: data.info_name,
      info_disc: data.info_disc,
      about_name: data.about_name,
      about_job: data.about_job,
      about_disc: data.about_disc,
      about_note: data.about_note,
      skills_disc: data.skills_disc,
    });

    this.aboutSocialIcons.clear();
    data.about_social_i.forEach((icon: string) => {
      this.aboutSocialIcons.push(new FormControl(icon));
    });

    this.aboutSocialLinks.clear();
    data.about_social_link.forEach((link: string) => {
      this.aboutSocialLinks.push(new FormControl(link));
    });
  }

  deleteHome(id: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this._homeS.deleteHome(id).subscribe(
        response => {
          alert('Home data deleted successfully!');
          this.loadHomeData();
        },
        error => {
          console.error('Delete failed:', error);
          alert('Failed to delete data.');
        }
      );
    }
  }

  resetForm() {
    this.homeForm.reset();
    this.aboutSocialIcons.clear();
    this.aboutSocialLinks.clear();
    this.skillsFiles = [];
    this.isEditing = false;
    this.editingId = null;
  }
}
