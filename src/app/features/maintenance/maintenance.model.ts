export interface IMaintenanceRequest {
  id?: number;
  title: string;
  description: string;
}

export interface IMaintenanceRequestResponse {
  requests: IMaintenanceRequest[];
}
