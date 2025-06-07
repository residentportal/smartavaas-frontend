import { NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Eye, EyeClosed, LucideAngularModule } from 'lucide-angular';
import { ToastService } from '../../../core/services/toast.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgIf,
    RouterLink,
    LucideAngularModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  protected isLoading = signal<boolean>(false);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  readonly eyeOpenIcon = Eye;
  readonly eyeCloseIcon = EyeClosed;
  password: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  registerForm = this.fb.group(
    {
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
          ),
        ],
      ],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    {
      validators: (group) => {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmpassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
      },
    }
  );

  onSubmit() {
    if (this.registerForm.valid && this.registerForm.value) {
      this.isLoading.set(true);
      const formData = {
        firstname: this.registerForm.value.firstname ?? '',
        lastname: this.registerForm.value.lastname ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
      };
      this.authService.register(formData).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.toastService.showSuccess('Sucess', 'Created Successfully');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading.set(false);
          this.toastService.showError('Error', err.error);
        },
      });
    } else {
      this.toastService.showError('Error', 'Please enter required fields');
    }
  }

  get passwordChecks() {
    return {
      hasUpperCase: /[A-Z]/.test(this.password),
      hasLowerCase: /[a-z]/.test(this.password),
      hasNumber: /\d/.test(this.password),
      hasSymbol: /[\W_]/.test(this.password),
      hasMinLength: this.password.length >= 8,
    };
  }
  onPasswordInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.password = input?.value || '';
  }

  constructor() {}
}
