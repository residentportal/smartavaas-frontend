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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Eye, EyeClosed, LucideAngularModule } from 'lucide-angular';
import { InputOtp } from 'primeng/inputotp';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../auth.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterLink,
    LucideAngularModule,
    InputOtp,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  protected isLoading = signal<boolean>(false);
  protected isOtpLoading = signal<boolean>(false);
  private toastService = inject(ToastService);
  loginForm: FormGroup;
  private router = inject(Router);
  private authService = inject(AuthService);
  protected showPassword: boolean = false;
  readonly eyeOpenIcon = Eye;
  readonly eyeCloseIcon = EyeClosed;
  isOtpLogin: boolean = false;
  otpEmail: string = '';
  showOtpInput: boolean = false;
  otpValue: string = '';
  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
  enableOtpLogin(): void {
    this.isOtpLogin = true;
  }
  cancelOtpLogin(): void {
    this.isOtpLogin = false;
    this.otpEmail = '';
  }
  submitOtpEmail(): void {
    this.isOtpLoading.set(true);
    this.toastService.showSuccess('OTP Sent', 'Check your email for the OTP');
    this.showOtpInput = true;
    setTimeout(() => {
      this.isOtpLoading.set(false);
    }, 2000);
  }

  verifyOtp(): void {
    this.toastService.showSuccess('OTP Verified', 'OTP is correct!');
    this.router.navigate(['./dashboard']);
  }
  resendOtp(): void {
    this.toastService.showSuccess(
      'OTP Sent',
      'A new OTP has been sent to your email'
    );
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
