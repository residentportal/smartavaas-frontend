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
import { catchError, switchMap } from 'rxjs';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../auth.service';
import { IVerifyOtp } from './login.model';

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
  otpValue!: string;
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
    this.authService
      .isEmailValid(this.otpEmail)
      .pipe(
        switchMap(() => this.authService.sendOtp(this.otpEmail)),
        catchError((err) => {
          throw err;
        })
      )
      .subscribe({
        next: () => {
          this.toastService.showSuccess(
            'OTP Sent',
            'Check your email for the OTP'
          );
          this.showOtpInput = true;
          this.isOtpLoading.set(false);
        },
        error: (err) => {
          console.log(err);
          this.toastService.showError(
            'Error',
            err.error?.message || 'An error occurred'
          );
          this.isOtpLoading.set(false);
        },
      });
  }

  verifyOtp(): void {
    this.authService.verifyOtp(this.otpEmail, this.otpValue).subscribe({
      next: (res: IVerifyOtp) => {
        const token = res.data.token;
        const username = res.data.fullname;
        sessionStorage.setItem('auth_token', token ?? '');
        sessionStorage.setItem('username', username ?? '');
        this.router.navigate(['./dashboard']);
      },
      error: () => {
        this.toastService.showError('Invalid OTP', 'Please enter valid OTP');
      },
    });
  }
  resendOtp(): void {
    this.submitOtpEmail();
    this.otpValue = '';
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastService.showError('Error', 'Please enter credentials');
      return;
    }
    this.isLoading.set(true);
    const formData = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = formData;
    this.authService.login(email, password).subscribe({
      next: (res: IVerifyOtp) => {
        const token = res.data.token;
        const username = res.data.fullname;
        sessionStorage.setItem('auth_token', token ?? '');
        sessionStorage.setItem('username', username ?? '');
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
