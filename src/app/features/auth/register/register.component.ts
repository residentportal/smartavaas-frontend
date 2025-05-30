import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgClass, NgIf, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  registerForm = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    mobile: [
      '',
      [Validators.required, Validators.pattern(/^([+]\d{2})?\d{10}$/)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.value) {
      const formData = {
        firstname: this.registerForm.value.firstname ?? '',
        lastname: this.registerForm.value.lastname ?? '',
        email: this.registerForm.value.email ?? '',
        mobile: this.registerForm.value.mobile ?? '',
        password: this.registerForm.value.password ?? '',
      };
      this.authService.register(formData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  constructor() {}
}
