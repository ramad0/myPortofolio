import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HomeService } from '../Services_/home.service';
import { ScrollRevealService } from '../Services_/scroll-reveal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homeData: any[] = [];

  constructor(
    private _homeS: HomeService,
    private _scrollRevealService: ScrollRevealService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.loadHomeData();
  }

  loadHomeData(): void {
    this._homeS.getHome().subscribe(
      data => {
        this.homeData = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          this._scrollRevealService.revealElements();
        }, 0); 
      },
      error => {
        console.error('Error fetching home data:', error);
      }
    );
  }
}
