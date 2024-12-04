import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProjectsService } from '../Services_/projects.service';
import { ScrollRevealService } from '../Services_/scroll-reveal.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private _projectS: ProjectsService ,
    private _scrollRevealService: ScrollRevealService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProjects();
  }


  loadProjects() {
    this._projectS.getProjects().subscribe(
      data => {
        this.projects = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          this._scrollRevealService.revealElements();
        }, 0);
      },
      error => {
        console.error('Error loading projects:', error);
      }
    );
  }
}
