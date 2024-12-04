import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services_/services.service';
import { ScrollRevealService } from '../Services_/scroll-reveal.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent  implements OnInit{
  services: any[] = [];
  constructor(private _services: ServicesService ,private _scrollRevealService: ScrollRevealService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this._services.getServices().subscribe(
      data => {
        this.services = data;
        this.cdr.detectChanges();
        setTimeout(() => {
          this._scrollRevealService.revealElements();
        }, 0);
      },
      error => {
        console.error('Error loading services:', error);
      }
    );
  }
}

