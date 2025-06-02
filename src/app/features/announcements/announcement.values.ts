import { InjectionToken } from '@angular/core';
import { Announcement } from './announcement.model';

export const announcementToken = new InjectionToken<Announcement[]>(
  'announcementToken'
);
export const announcementData: Announcement[] = [
  {
    id: 11,
    description: 'Dinner with friends 7PM',
    durationInMinutes: 120,
    createdAt: '2025-06-02T19:00:00.000000',
    modifiedAt: '2025-06-02T19:00:00.000000',
    status: 'OPEN',
  },
  {
    id: 12,
    description: 'Gym workout session 6AM',
    durationInMinutes: 90,
    createdAt: '2025-06-02T06:00:00.000000',
    modifiedAt: '2025-06-02T06:00:00.000000',
    status: 'COMPLETED',
  },
  {
    id: 13,
    description: 'Doctor appointment 10AM',
    durationInMinutes: 30,
    createdAt: '2025-06-01T10:00:00.000000',
    modifiedAt: '2025-06-01T10:00:00.000000',
    status: 'CANCELLED',
  },
  {
    id: 14,
    description: 'Work meeting via Zoom 3PM',
    durationInMinutes: 60,
    createdAt: '2025-06-02T15:00:00.000000',
    modifiedAt: '2025-06-02T15:00:00.000000',
    status: 'PENDING',
  },
  {
    id: 15,
    description: 'Lunch with client 12:30PM',
    durationInMinutes: 75,
    createdAt: '2025-06-02T12:30:00.000000',
    modifiedAt: '2025-06-02T12:30:00.000000',
    status: 'OPEN',
  },
  {
    id: 16,
    description: 'Team retrospective 5PM',
    durationInMinutes: 45,
    createdAt: '2025-06-01T17:00:00.000000',
    modifiedAt: '2025-06-01T17:00:00.000000',
    status: 'COMPLETED',
  },
  {
    id: 17,
    description: 'Project planning session 9AM',
    durationInMinutes: 90,
    createdAt: '2025-06-03T09:00:00.000000',
    modifiedAt: '2025-06-03T09:00:00.000000',
    status: 'PENDING',
  },
  {
    id: 18,
    description: 'Call with supplier 2PM',
    durationInMinutes: 30,
    createdAt: '2025-06-02T14:00:00.000000',
    modifiedAt: '2025-06-02T14:00:00.000000',
    status: 'CANCELLED',
  },
  {
    id: 19,
    description: 'Webinar: Tech Trends 2025 - 4PM',
    durationInMinutes: 60,
    createdAt: '2025-06-02T16:00:00.000000',
    modifiedAt: '2025-06-02T16:00:00.000000',
    status: 'OPEN',
  },
  {
    id: 20,
    description: 'Code review with team 11AM',
    durationInMinutes: 40,
    createdAt: '2025-06-01T11:00:00.000000',
    modifiedAt: '2025-06-01T11:00:00.000000',
    status: 'COMPLETED',
  },
];
