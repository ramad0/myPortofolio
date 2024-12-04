import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrollup',
  templateUrl: './scrollup.component.html',
  styleUrls: ['./scrollup.component.css']
})
export class ScrollupComponent {
  scrollPosition: number = 0;
  isScrolled: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    this.scrollPosition = window.scrollY || document.documentElement.scrollTop;

    if (this.scrollPosition > 100) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
