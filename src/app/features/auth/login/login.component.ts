import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  getUsername = signal<string>('');
  loginForm: FormGroup;
  submitted = false;
  private router = inject(Router);
  private authService = inject(AuthService);
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^([+]\d{2})?\d{10}$/)],
      ],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    const formData = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(formData).subscribe({
      next: (res) => {
        this.getUsername.set('John');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
