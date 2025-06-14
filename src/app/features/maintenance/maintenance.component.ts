import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaintenanceRequestFormComponent } from './components/maintenance-request-form/maintenance-request-form.component';
import MaintenanceRequestListComponent from './components/maintenance-request-list/maintenance-request-list.component';

@Component({
  selector: 'app-maintenance',
  imports: [MaintenanceRequestFormComponent, MaintenanceRequestListComponent],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaintenanceComponent {}
