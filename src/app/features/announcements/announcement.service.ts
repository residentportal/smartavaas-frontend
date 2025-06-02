import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Announcement } from './announcement.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private baseURL = environment.apiUrl;
  constructor() {}
  private http = inject(HttpClient);

  getAnnouncements(): Observable<Announcement[]> {
    const token = ``;
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Announcement[]>(`${this.baseURL}getAnnouncement`, {
      headers,
    });
  }
}
