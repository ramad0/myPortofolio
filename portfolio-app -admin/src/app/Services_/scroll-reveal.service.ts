import { Injectable } from '@angular/core';
import ScrollReveal from 'scrollreveal';

@Injectable({
  providedIn: 'root',
})
export class ScrollRevealService {
  private scrollRevealInstance = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
  });

  constructor() {}

  revealElements(): void {
    this.scrollRevealInstance.reveal(`.perfil, .contact__form`);
    this.scrollRevealInstance.reveal(`.info`, { origin: 'left', delay: 800 });
    this.scrollRevealInstance.reveal(`.skills`, { origin: 'left', delay: 1000 });
    this.scrollRevealInstance.reveal(`.about`, { origin: 'right', delay: 1200 });
    this.scrollRevealInstance.reveal(
      `.projects__card, .services__card, .experience__card`,
      { interval: 100 }
    );
  }
}
