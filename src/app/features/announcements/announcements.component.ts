import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { map } from 'rxjs';
import { ToastService } from '../../core/services/toast.service';
import { Announcement } from './announcement.model';
import { AnnouncementService } from './announcement.service';

@Component({
  selector: 'app-announcements',
  imports: [CommonModule],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AnnouncementsComponent implements OnInit {
  private announcementService = inject(AnnouncementService);
  private toastService = inject(ToastService);
  announcements = signal<Announcement[]>([]);

  constructor() {}

  ngOnInit() {
    this.announcementService
      .getAnnouncements()
      .pipe(map((r) => r.filter((r) => r.status === 'OPEN')))
      .subscribe({
        next: (res) => {
          res.map((r) => {
            r.createdAt = this.getRelativeTime(r.createdAt);
          });
          this.announcements.set(res);
        },
        error: () => {
          this.toastService.showError('Error', 'Error Fetching Details');
        },
      });
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
