import { Component, OnInit } from '@angular/core';
import { FooterService } from '../Services_/footer.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  constructor(private _footerS:FooterService){}
  ngOnInit(): void {
    this._footerS.getFooters().subscribe(
      data => {
        this.footers= data;
    }
    )
  }
  footers: any[] = [];
}
