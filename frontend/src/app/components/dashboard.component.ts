import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusService, StatusCount } from '../services/status.service';
import { StatusCardComponent } from './status-card.component';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component'; // Add this import
import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, StatusCardComponent, SearchBarComponent, NavbarComponent],
  template: `
    
    <app-navbar></app-navbar>
    <app-search-bar></app-search-bar>
    <div class="topbar">
      <div class="title">Daily Workload Dashboard</div>
      
    </div>

    <div class="grid">
      <ng-container *ngFor="let s of counts">
        <app-status-card [icon]="iconFor(s.status)" [status]="s.status" [count]="s.count" [color]="colorFor(s.status)"></app-status-card>
      </ng-container>
    </div>
  `,
 // In your dashboard.component.ts
styles: [
    
  `:host {  margin-left: 0;   /* remove top/left browser defaults */
  padding: 0; font-family:Inter, system-ui, sans-serif }`,
  `.topbar { display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; margin-left: 1rem; margin-right: 1rem; }`,
  `.title { font-size:20px; font-weight:700 }`,
  `.controls input { padding:8px 10px; border-radius:6px; border:1px solid #ddd }`,
  `.grid { 
    display: grid; 
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
    gap: 20px; 
    align-items: stretch; /* Add this */
    margin-left: 1rem;
    margin-right: 1rem;
  }`
]
})
export class DashboardComponent {
  counts: StatusCount[] = [];
  selectedDate = '';

  constructor(private svc: StatusService, private cdr: ChangeDetectorRef) {
    this.load();
  }

  load() {
    const date = this.selectedDate || undefined;
    this.svc.getStatusCounts(date).subscribe({
      next: (rows) => {
        this.counts = rows;
        this.cdr.markForCheck();   // 👈 force refresh
      },
      error: () => {
        this.counts = [];
        this.cdr.markForCheck();
      }
    });
  }

  // simple icon mapping
  iconFor(status: string) {
    const s = (status || '').toLowerCase();
    if (s.includes('on hold')) return '⛔';
    if (s.includes('documents')) return '📄';
    if (s.includes('ttg') || s.includes('sent')) return '📤';
    if (s.includes('post')) return '✅';
    return '🔔';
  }

  colorFor(status: string) {
    const s = (status || '').toLowerCase();
    if (s.includes('on hold')) return '#EC1C24'; // TTG red
    return '#082240'; // TTG dark blue
  }
}
