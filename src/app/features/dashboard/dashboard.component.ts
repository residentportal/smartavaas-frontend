import { ChangeDetectionStrategy, Component } from '@angular/core';
import AnnouncementsComponent from '../announcements/announcements.component';

@Component({
  selector: 'app-dashboard',
  imports: [AnnouncementsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DashboardComponent {
  protected username = sessionStorage.getItem('username');
}
