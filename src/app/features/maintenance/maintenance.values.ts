import { InjectionToken } from '@angular/core';
import { IMaintenanceRequestResponse } from './maintenance.model';

export const maintenanceToken = new InjectionToken<IMaintenanceRequestResponse>(
  'maintenanceToken'
);
export const maintenanceRequestResponse: IMaintenanceRequestResponse = {
  requests: [
    {
      id: 1,
      title: 'Leaky Faucet',
      description: 'The kitchen faucet is leaking and needs repair.',
    },
    {
      id: 2,
      title: 'Broken Window',
      description: 'The window in the living room is broken.',
    },
    {
      id: 3,
      title: 'Clogged Drain',
      description: 'Bathroom drain is clogged and water is backing up.',
    },
    {
      id: 4,
      title: 'Faulty Light Switch',
      description: 'The hallway light switch is not functioning properly.',
    },
    {
      id: 5,
      title: 'Heating Issue',
      description: 'The central heating system is not turning on.',
    },
    {
      id: 6,
      title: 'Broken Door Lock',
      description: 'The main entrance door lock is jammed.',
    },
  ],
};
