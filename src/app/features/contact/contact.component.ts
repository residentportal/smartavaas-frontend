import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Contact,
  LocateIcon,
  LucideAngularModule,
  PhoneIcon,
} from 'lucide-angular';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export default class ContactComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  protected readonly contactIcon = Contact;
  protected readonly locationIcon = LocateIcon;
  protected readonly phoneIcon = PhoneIcon;

  contactForm = this.fb.group({
    fullname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
  });

  onSubmit() {
    if (this.contactForm.invalid) {
      return;
    }
    this.toastService.showInfo('Success', 'Submitted successfully');
    console.log(this.contactForm.value);
  }
  contact = [
    {
      icon: this.contactIcon,
      label: 'Mail Us',
      value: 'admin@smartavaas.com',
    },
    {
      icon: this.phoneIcon,
      label: 'Contact Us',
      value: '+19999999999',
    },
    {
      icon: this.locationIcon,
      label: 'Location',
      value: 'United States of America',
    },
  ];
}
