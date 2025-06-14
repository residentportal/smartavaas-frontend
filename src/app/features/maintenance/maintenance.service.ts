import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IMaintenanceRequest } from './maintenance.model';
import { maintenanceRequestResponse } from './maintenance.values';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceService {
  constructor() {}
  private requestsSubject = new BehaviorSubject<IMaintenanceRequest[]>(
    maintenanceRequestResponse.requests
  );
  allRequests$ = this.requestsSubject.asObservable();

  createRequest(request: IMaintenanceRequest) {
    const current = this.requestsSubject.value;
    const newRequest = { ...request, id: current.length + 1 };
    this.requestsSubject.next([...current, newRequest]);
  }

  getAllRequests(): IMaintenanceRequest[] {
    return this.requestsSubject.value;
  }
}
