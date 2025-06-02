import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnnouncementService } from './announcement.service';
import { announcementData, announcementToken } from './announcement.values';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule],
  providers: [{ provide: announcementToken, useValue: announcementData }],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnnouncementsComponent {
  private announcementService = inject(AnnouncementService);
  announcements = announcementData.filter((s) => s.status === 'OPEN');

  constructor() {
    this.announcementService
      .getAnnouncements()
      .subscribe((c) => console.log(c));
    console.log(this.announcements);
    this.announcements = this.announcements.map((a) => ({
      ...a,
      createdAt: this.getRelativeTime(a.createdAt),
    }));
  }
  getRelativeTime(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  }
}
