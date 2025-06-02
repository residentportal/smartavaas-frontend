import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnnouncementService } from './announcement.service';

@Component({
  selector: 'app-announcements',
  imports: [],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnnouncementsComponent {
  private announcementService = inject(AnnouncementService);
  constructor() {
    this.announcementService
      .getAnnouncements()
      .subscribe((c) => console.log(c));
  }
}
