import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar.component';
import { DashboardComponent } from './components/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'home', component: DashboardComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
];