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
import { Eye, EyeClosed, LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../auth.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, LucideAngularModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  protected isLoading = signal<boolean>(false);
  private toastService = inject(ToastService);
  loginForm: FormGroup;
  private router = inject(Router);
  private authService = inject(AuthService);
  protected showPassword: boolean = false;
  readonly eyeOpenIcon = Eye;
  readonly eyeCloseIcon = EyeClosed;
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    this.isLoading.set(true);
    const formData = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(formData).subscribe({
      next: (res: Login) => {
        sessionStorage.setItem('username', res.fullname ?? '');
        sessionStorage.setItem('auth_token', res.token ?? '');
        this.isLoading.set(false);
        this.toastService.showSuccess('Success', 'Login Success');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        this.isLoading.set(false);
        this.toastService.showError('Error', err.error);
      },
    });
  }
}
