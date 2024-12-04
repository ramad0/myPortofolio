import { Component, OnInit } from '@angular/core';
import { FooterService } from '../Services_/footer.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  footers: any[] = [];

  productForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    footer_name: new FormControl(''),
  });

  constructor(private _footerS: FooterService) {}

  ngOnInit(): void {
    this.loadFooters();
  }

  loadFooters() {
    this._footerS.getFooters().subscribe(
      data => {
        this.footers = data;
      },
      error => {
        console.error('Error loading footers:', error);
      }
    );
  }

  addFooter() {
    if (this.productForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const footerData = { footer_name: this.productForm.get('footer_name')?.value };

    this._footerS.addFooter(footerData).subscribe(
      data => {
        console.log('Footer added:', data);
        this.loadFooters();
        this.productForm.reset();
      },
      error => {
        console.error('Error adding footer:', error);
      }
    );
  }

  updateFooter(_id: string) {
    if (this.productForm.invalid) {
      console.log('Form is invalid!');
      return;
    }
    
    const footerData = { footer_name: this.productForm.get('footer_name')?.value };
    this._footerS.updateFooter(_id, footerData).subscribe(
      data => {
        console.log('Footer updated:', data);
        this.loadFooters();
        this.productForm.reset();
      },
      error => {
        console.error('Error updating footer:', error);
      }
    );
  }

  deleteFooter(_id: string) {
    this._footerS.deleteFooter(_id).subscribe(
      data => {
        console.log('Footer deleted:', data);
        this.loadFooters();
      },
      error => {
        console.error('Error deleting footer:', error);
      }
    );
  }

  editFooter(footer: any) {
    this.productForm.setValue({
      _id: footer._id,
      footer_name: footer.footer_name,
    });
  }
}
