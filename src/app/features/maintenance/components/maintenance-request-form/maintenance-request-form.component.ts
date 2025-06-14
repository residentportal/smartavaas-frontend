import { NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaintenanceService } from '../../maintenance.service';

@Component({
  selector: 'app-maintenance-request-form',
  imports: [ReactiveFormsModule, NgClass, NgIf],
  templateUrl: './maintenance-request-form.component.html',
  styleUrl: './maintenance-request-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaintenanceRequestFormComponent {
  private fb = inject(FormBuilder);
  private maintenanceService = inject(MaintenanceService);
  protected maintenanceForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  onSubmit() {
    if (this.maintenanceForm.valid) {
      const formData = this.maintenanceForm.value;
      const request = {
        title: formData.title ?? '',
        description: formData.description ?? '',
      };
      this.maintenanceService.createRequest(request);
      this.maintenanceForm.reset();
    } else {
      console.log('Form is invalid');
    }
  }
}
