import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Toast } from 'primeng/toast';
import { HeaderComponent } from './layouts/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'smartavaas-frontend';
}
