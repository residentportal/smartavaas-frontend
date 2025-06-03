import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterModule } from '@angular/router';
import {
  BellIcon,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  CircleUser,
  ConstructionIcon,
  Contact,
  FileIcon,
  FileText,
  HelpCircle,
  LayoutDashboard,
  LogInIcon,
  LogOutIcon,
  LucideAngularModule,
  MenuIcon,
  MicVocalIcon,
  PhoneCall,
  Settings,
  StoreIcon,
  TicketPercentIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-angular';
import { AuthService } from '../../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatListModule,
    MatRippleModule,
    RouterModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    CdkAccordionModule,
    LucideAngularModule,
    MatMenuModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(public route: Router) {}
  protected authService = inject(AuthService);
  readonly FileIcon = FileIcon;
  showFiller = false;
  readonly menuIcon = MenuIcon;
  readonly bellIcon = BellIcon;
  readonly userIcon = UserIcon;
  readonly usersIcon = UsersIcon;
  readonly chevronupIcon = ChevronUp;
  readonly chevronDownIcon = ChevronDown;
  readonly logoutIcon = LogOutIcon;
  readonly loginIcon = LogInIcon;
  readonly contactIcon = Contact;
  readonly dollarIcon = CircleDollarSign;
  readonly storeIcon = StoreIcon;
  readonly ticketIcon = TicketPercentIcon;
  items = ['Placeholder 1'];
  navItems = [
    {
      path: 'dashboard',
      menuItem: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: 'payments',
      menuItem: 'Payments',
      icon: CircleDollarSign,
    },
    {
      path: 'marketplace',
      menuItem: 'Marketplace',
      icon: StoreIcon,
    },
    {
      path: 'visitor',
      menuItem: 'Visitor',
      icon: CircleUser,
    },
    {
      path: 'announcements',
      menuItem: 'Announcements',
      icon: MicVocalIcon,
    },
    {
      path: 'login',
      menuItem: 'Maintenance',
      icon: ConstructionIcon,
    },
    {
      path: 'documents',
      menuItem: 'Documents',
      icon: FileText,
    },
    {
      path: 'emergency-contacts',
      menuItem: 'Emergency Contacts',
      icon: PhoneCall,
    },
    {
      path: 'inspections',
      menuItem: 'Inspections',
      icon: CheckCircle,
    },
    {
      path: 'settings',
      menuItem: 'Settings',
      icon: Settings,
    },
    {
      path: 'contact',
      menuItem: 'Help Support',
      icon: HelpCircle,
    },
  ];

  amenities = [
    {
      path: 'reservation',
      menuItem: 'Reservation',
      icon: TicketPercentIcon,
    },
  ];
  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }

  isMobileOrTablet(): boolean {
    const ua = navigator.userAgent;
    console.log(ua);
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Tablet|Mobile/i.test(
      ua
    );
  }
}
