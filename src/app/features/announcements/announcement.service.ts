import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Announcement } from './announcement.model';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private http = inject(HttpClient);

  getAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`api/getAnnouncement`);
  }
}
