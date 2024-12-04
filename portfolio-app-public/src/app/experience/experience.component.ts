import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ExperienceService } from '../Services_/experience.service';
import { ScrollRevealService } from '../Services_/scroll-reveal.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent implements OnInit {
  experiences: any[] = [];
  constructor(private _experienceS: ExperienceService ,
    private _scrollRevealService: ScrollRevealService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences() {
    this._experienceS.getExperiences().subscribe(
      data => {
        this.experiences = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          this._scrollRevealService.revealElements();
        }, 0);
      },
      error => {
        console.error('Error loading experiences:', error);
      }
    );
  }
}
