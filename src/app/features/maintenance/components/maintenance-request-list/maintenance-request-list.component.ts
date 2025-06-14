import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IMaintenanceRequest } from '../../maintenance.model';
import { MaintenanceService } from '../../maintenance.service';

@Component({
  selector: 'app-maintenance-request-list',
  imports: [NgIf, AsyncPipe],
  templateUrl: './maintenance-request-list.component.html',
  styleUrl: './maintenance-request-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MaintenanceRequestListComponent {
  private maintenanceService = inject(MaintenanceService);
  protected maintenanceRequests$: Observable<IMaintenanceRequest[]> =
    this.maintenanceService.allRequests$;

  ngOnInit() {
    this.maintenanceRequests$ = this.maintenanceService.allRequests$.pipe(
      map((requests) =>
        requests.slice().sort((a, b) => {
          const aId = typeof a.id === 'number' ? a.id : 0;
          const bId = typeof b.id === 'number' ? b.id : 0;
          return bId - aId;
        })
      )
    );
  }
}
