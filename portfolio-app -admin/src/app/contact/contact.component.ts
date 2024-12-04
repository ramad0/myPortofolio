import { Component } from '@angular/core';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactMessage: string = '';
  sendEmail(form: any): void {
    if (form.valid) {
      emailjs
        //           serviceID    -     templateID     -  #form      -      publicKey
        .sendForm('service_lzys10p','template_ut2b0tk','#contact-form','qBOv2oStMdRzZDD_u')
        .then(
          () => {
            this.contactMessage = 'Message sent successfully ✅';
            setTimeout(() => {
              this.contactMessage = '';
            }, 5000);
            form.resetForm();
          },
          (error) => {
            console.error('Email sending error:', error);
            this.contactMessage = 'Message not sent (service error) ❌';
          }
        );
    } else {
      this.contactMessage = 'Please fill out all required fields ❌';
    }
  }
}
