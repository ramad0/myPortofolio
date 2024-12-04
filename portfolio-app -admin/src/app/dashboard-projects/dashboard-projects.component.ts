import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../Services_/projects.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-projects',
  templateUrl: './dashboard-projects.component.html',
  styleUrls: ['./dashboard-projects.component.css']
})
export class DashboardProjectsComponent implements OnInit {
  projects: any[] = [];
  skillImages: File[] = [];

  projectForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    project_name: new FormControl(''),
    project_url: new FormControl(''),
    project_skill_img_src: new FormControl([]),
    project_disc: new FormControl(''),
    project_img: new FormControl(null)
  });

  constructor(private _projectS: ProjectsService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects() {
    this._projectS.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }

  onFileChange(event: any, fieldName: string) {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files) as File[];
      if (fieldName === 'project_skill_img_src') {
        this.skillImages = [...this.skillImages.filter(file => file !== null), ...files];
        this.projectForm.patchValue({ project_skill_img_src: this.skillImages });
      } else if (fieldName === 'project_img') {
        this.projectForm.patchValue({ project_img: files[0] });
      }
    }
  }

  addSkillImage() {
    this.skillImages.push(undefined as any);
    this.projectForm.patchValue({ project_skill_img_src: this.skillImages });
  }

  addProject() {
    if (this.projectForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const myFormData = new FormData();
    myFormData.append('project_name', this.projectForm.get('project_name')?.value);
    myFormData.append('project_url', this.projectForm.get('project_url')?.value);
    myFormData.append('project_disc', this.projectForm.get('project_disc')?.value);

    if (this.projectForm.get('project_img')?.value) {
      myFormData.append('project_img', this.projectForm.get('project_img')?.value);
    }

    this.skillImages.forEach((file: File) => {
      if (file) {
        myFormData.append('project_skill_img_src', file);
      }
    });

    this._projectS.addProject(myFormData).subscribe(
      data => {
        console.log('Project added successfully:', data);
        this.loadProjects();
        this.projectForm.reset();
        this.skillImages = [];
      },
      error => {
        console.error('Error adding project:', error);
      }
    );
  }

  updateProject(_id: string) {
    if (this.projectForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const myFormData = new FormData();
    myFormData.append('project_name', this.projectForm.get('project_name')?.value);
    myFormData.append('project_url', this.projectForm.get('project_url')?.value);
    myFormData.append('project_disc', this.projectForm.get('project_disc')?.value);

    if (this.projectForm.get('project_img')?.value) {
      myFormData.append('project_img', this.projectForm.get('project_img')?.value);
    }

    this.skillImages.forEach((file: File) => {
      if (file) {
        myFormData.append('project_skill_img_src', file);
      }
    });

    this._projectS.updateProject(_id, myFormData).subscribe(
      data => {
        console.log('Project updated successfully:', data);
        this.loadProjects();
        this.projectForm.reset();
        this.skillImages = [];
      },
      error => {
        console.error('Error updating project:', error);
      }
    );
  }

  deleteProject(_id: string) {
    this._projectS.deleteProject(_id).subscribe(
      data => {
        console.log('Project deleted successfully:', data);
        this.loadProjects();
      },
      error => {
        console.error('Error deleting project:', error);
      }
    );
  }

  editProject(project: any) {
    this.projectForm.setValue({
      _id: project._id,
      project_name: project.project_name,
      project_url: project.project_url,
      project_disc: project.project_disc,
      project_skill_img_src: [],
      project_img: null 
    });
  }
}
