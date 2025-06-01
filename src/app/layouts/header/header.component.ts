import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
  Contact,
  FileIcon,
  FileText,
  Hammer,
  HelpCircle,
  LayoutDashboard,
  LogInIcon,
  LogOutIcon,
  LucideAngularModule,
  MenuIcon,
  PhoneCall,
  Settings,
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
  items = ['Placeholder 1'];
  navItems = [
    {
      path: 'dashboard',
      menuItem: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      path: 'login',
      menuItem: 'Maintenance',
      icon: Hammer,
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
  community = [
    {
      path: 'community-members',
      menuItem: 'Community Members',
      icon: UsersIcon,
    },
    {
      path: 'forgot-password',
      menuItem: 'Community Documents',
      icon: FileIcon,
    },
  ];
  logout() {
    this.authService.logout();
    this.route.navigate(['/']);
  }
}
