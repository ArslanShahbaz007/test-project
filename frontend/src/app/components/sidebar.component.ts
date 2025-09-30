import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="app-container">
      <!-- Mobile Overlay -->
      <div 
        class="mobile-overlay" 
        *ngIf="isMobile() && sidebarOpen()" 
        (click)="closeSidebar()">
      </div>
      
      <!-- Sidebar -->
      <aside 
        class="sidebar" 
        [class.sidebar-collapsed]="!sidebarOpen() && !isMobile()"
        [class.sidebar-mobile]="isMobile()"
        [class.sidebar-mobile-open]="sidebarOpen() && isMobile()">
        
        <!-- Header -->
        <div class="sidebar-header">
          <div class="logo" *ngIf="sidebarOpen() || !isMobile()">
            <div class="logo-icon">📊</div>
            <span class="logo-text">Workload Pro</span>
          </div>
          <button class="toggle-btn" (click)="toggleSidebar()">
            {{ getToggleIcon() }}
          </button>
        </div>

        <!-- Navigation -->
        <nav class="sidebar-nav">
          <a 
            class="nav-item" 
            routerLink="/"
            routerLinkActive="active"
            (click)="onNavItemClick()">
            <span class="nav-icon">🏠</span>
            <span class="nav-text" *ngIf="sidebarOpen() || !isMobile()">Dashboard</span>
          </a>
        </nav>

        <!-- Footer -->
        <div class="sidebar-footer" *ngIf="sidebarOpen() || !isMobile()">
          <div class="user-info">
            <div class="user-avatar">AU</div>
            <div class="user-details">
              <div class="user-name">Admin User</div>
              
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <!-- Mobile Header -->
        <div class="mobile-header" *ngIf="isMobile()">
          <button class="menu-btn" (click)="toggleSidebar()">☰</button>
          <h1>Dashboard</h1>
        </div>
        
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [
    `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .app-container {
      display: flex;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8fafc;
    }

    /* Mobile Overlay */
    .mobile-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 998;
    }

    /* Sidebar */
    .sidebar {
      display: flex;
      flex-direction: column;
      width: 260px;
      background: #1e293b;
      color: white;
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      z-index: 999;
      transition: all 0.3s ease;
      border-right: 1px solid #334155;
      font-family: 'Inter', sans-serif; /* Add this */
    }
      .sidebar-nav {
  flex: 1; /* This makes the nav take up all available space */
}

.sidebar-footer {
  margin-top: auto; /* This pushes the footer to the bottom */
}

    /* Collapsed sidebar on desktop */
    .sidebar.sidebar-collapsed {
      width: 70px;
    }
    .sidebar.sidebar-collapsed .nav-text,
    .sidebar.sidebar-collapsed .logo-text,
    .sidebar.sidebar-collapsed .user-details,
    .sidebar.sidebar-collapsed .logo-icon {
      display: none;
    }

    .sidebar.sidebar-collapsed .nav-text,
    .sidebar.sidebar-collapsed .logo-text,
    .sidebar.sidebar-collapsed .user-details {
      display: none;
    }

    /* Mobile sidebar */
    .sidebar.sidebar-mobile {
      transform: translateX(-100%);
    }

    .sidebar.sidebar-mobile-open {
      transform: translateX(0);
    }

    /* Sidebar Header */
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem 1rem;
      border-bottom: 1px solid #334155;
      height: 80px;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      font-size: 1.5rem;
    }

    .logo-text {
      font-weight: 600;
      font-size: 1.1rem;
      color: white;
    }

    .toggle-btn {
      background: #334155;
      border: none;
      color: white;
      padding: 0.5rem;
      border-radius: 6px;
      cursor: pointer;
      font-size: 1rem;
    }

    .toggle-btn:hover {
      background: #475569;
    }

    /* Navigation */
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0;
    }

    .nav-item {
      display: flex;
      align-items: center;
      padding: 0.75rem 1rem;
      color: #cbd5e1;
      text-decoration: none;
      transition: all 0.2s ease;
      gap: 0.75rem;
    }

    .nav-item:hover {
      background: #334155;
      color: white;
    }

    .nav-item.active {
      background: #3b82f6;
      color: white;
    }

    .nav-icon {
      font-size: 1.2rem;
      width: 20px;
      text-align: center;
    }

    .nav-text {
      font-weight: 500;
    }

    /* Sidebar Footer */
    .sidebar-footer {
      padding: 1rem;
      border-top: 1px solid #334155;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      width: 40px;
      height: 40px;
      background: #3b82f6;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: white;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.8rem;
      color: #94a3b8;
    }

    /* Main Content */
    .main-content {
      flex: 1;
      margin-left: 260px;
      min-height: 100vh;
      background: #ffffff;
      transition: margin-left 0.3s ease;
      padding: 0px;
    }

    /* Collapsed sidebar */
    .sidebar.sidebar-collapsed ~ .main-content {
      margin-left: 70px;
    }

    /* Mobile - no margin */
    .sidebar.sidebar-mobile ~ .main-content,
    .sidebar.sidebar-mobile-open ~ .main-content {
      margin-left: 0;
    }

    /* Mobile header */
    .mobile-header {
      display: none;
      align-items: center;
      padding: 1rem;
      background: white;
      border-bottom: 1px solid #e2e8f0;
      gap: 1rem;
    }

    .menu-btn {
      background: none;
      border: none;
      font-size: 1.2rem;
      padding: 0.5rem;
      cursor: pointer;
    }

    .mobile-header h1 {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
    }

    .content-area {
      padding: 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .main-content {
        margin-left: 0 !important;
      }
      
      .mobile-header {
        display: flex;
      }
    }
    `
  ]
})
export class SidebarComponent implements OnInit {
  private router = inject(Router);

  sidebarOpen = signal(true);
  
  ngOnInit() {
    // Set initial state based on screen size
    if (typeof window !== 'undefined') {
      this.sidebarOpen.set(!this.isMobile());
    }

    // Close sidebar on mobile navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.isMobile()) {
          this.closeSidebar();
        }
      });
  }

  toggleSidebar() {
    this.sidebarOpen.set(!this.sidebarOpen());
  }

  closeSidebar() {
    this.sidebarOpen.set(false);
  }

  onNavItemClick() {
    if (this.isMobile()) {
      this.closeSidebar();
    }
  }

  getToggleIcon(): string {
    if (this.isMobile()) {
      return '×';
    }
    return this.sidebarOpen() ? '←' : '→';
  }

  isMobile(): boolean {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  }
}