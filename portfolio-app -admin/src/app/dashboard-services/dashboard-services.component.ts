import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services_/services.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard-services',
  templateUrl: './dashboard-services.component.html',
  styleUrls: ['./dashboard-services.component.css']
})
export class DashboardServicesComponent implements OnInit {
  services: any[] = [];

  ServiceForm: FormGroup = new FormGroup({
    _id: new FormControl(''),
    services_i: new FormControl(''),
    services_name: new FormControl(''),
    services_disc: new FormControl(''),
  });

  constructor(private _services: ServicesService) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this._services.getServices().subscribe(
      data => {
        this.services = data;
      },
      error => {
        console.error('Error loading services:', error);
      }
    );
  }

  addService() {
    if (this.ServiceForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const serviceData = {
      services_i: this.ServiceForm.get('services_i')?.value,
      services_name: this.ServiceForm.get('services_name')?.value,
      services_disc: this.ServiceForm.get('services_disc')?.value,
    };

    this._services.addService(serviceData).subscribe(
      data => {
        console.log('Service added:', data);
        this.loadServices();
        this.ServiceForm.reset();
      },
      error => {
        console.error('Error adding service:', error);
      }
    );
  }

  updateService(_id: string) {
    if (this.ServiceForm.invalid) {
      console.log('Form is invalid!');
      return;
    }

    const serviceData = {
      services_i: this.ServiceForm.get('services_i')?.value,
      services_name: this.ServiceForm.get('services_name')?.value,
      services_disc: this.ServiceForm.get('services_disc')?.value,
    };

    this._services.updateService(_id, serviceData).subscribe(
      data => {
        console.log('Service updated:', data);
        this.loadServices();
        this.ServiceForm.reset();
      },
      error => {
        console.error('Error updating service:', error);
      }
    );
  }

  deleteService(_id: string) {
    this._services.deleteService(_id).subscribe(
      data => {
        console.log('Service deleted:', data);
        this.loadServices();
      },
      error => {
        console.error('Error deleting service:', error);
      }
    );
  }

  editService(service: any) {
    this.ServiceForm.setValue({
      _id: service._id,
      services_i: service.services_i,
      services_name: service.services_name,
      services_disc: service.services_disc,
    });
  }
}
