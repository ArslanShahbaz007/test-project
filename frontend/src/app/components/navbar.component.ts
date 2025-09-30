import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-content">
        <!-- Left side - Navigation Titles -->
        <div class="nav-links">
          <a class="nav-link active">Dashboard</a>
          <a class="nav-link">Analytics</a>
          <a class="nav-link">Reports</a>
          <a class="nav-link">Settings</a>
        </div>

        <!-- Right side - User Info -->
        <div class="user-section">
          <div class="notifications">
            <button class="icon-btn" aria-label="Notifications">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span class="notification-badge">3</span>
            </button>
          </div>
          
          <div class="user-profile">
            <div class="user-avatar">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="User" />
            </div>
            <div class="user-info">
              <span class="user-name">Admin User</span>
              <span class="user-role">Administrator</span>
            </div>
            <button class="dropdown-btn" aria-label="User menu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
    .navbar {
      background: white;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 1.5rem;
      height: 64px;
      display: flex;
      align-items: center;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 1.5rem;
      background: #1e293b; /* Same as sidebar */
      border-bottom: 1px solid #334155;
      color: white;
      

    }

    .navbar-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Navigation Links */
    .nav-links {
      display: flex;
      gap: 2rem;
      align-items: center;
    }

    .nav-link {
      color: #cbd5e1;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.9rem;
      padding: 0.5rem 0;
      position: relative;
      cursor: pointer;
      transition: color 0.2s ease;
      white-space: nowrap;
    }

    .nav-link:hover {
      color: white;
    }

    .nav-link.active {
      color: #60a5fa;
      font-weight: 600;
    }

    .nav-link.active::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 0;
      right: 0;
      height: 2px;
      background: #3b82f6;
      border-radius: 1px;
    }

    /* User Section */
    .user-section {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .notifications {
      position: relative;
    }

    .icon-btn {
      background: none;
      border: none;
      padding: 0.5rem;
      border-radius: 8px;
      color: #64748b;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon-btn:hover {
      background: #f1f5f9;
      color: #334155;
    }

    .notification-badge {
      position: absolute;
      top: 2px;
      right: 2px;
      background: #ef4444;
      color: white;
      font-size: 0.7rem;
      font-weight: 600;
      border-radius: 8px;
      min-width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 4px;
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.25rem;
      border-radius: 8px;
      transition: background 0.2s ease;
      cursor: pointer;
    }

    .user-profile:hover {
      background: #f8fafc;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      overflow: hidden;
    }

    .user-avatar img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .user-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: white;
      line-height: 1.2;
    }

    .user-role {
      font-size: 0.75rem;
      color: #94a3b8;
      line-height: 1.2;
    }

    .dropdown-btn {
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .dropdown-btn:hover {
      background: #f1f5f9;
      color: #334155;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .navbar {
        padding: 0 1rem;
      }
      
      .nav-links {
        gap: 1rem;
      }
      
      .nav-link {
        font-size: 0.8rem;
      }
      
      .user-info {
        display: none;
      }
    }

    @media (max-width: 640px) {
      .nav-links {
        display: none;
      }
      
      .navbar-content {
        justify-content: flex-end;
      }
    }
    `
  ]
})
export class NavbarComponent {
  // Component logic can be added here if needed
}