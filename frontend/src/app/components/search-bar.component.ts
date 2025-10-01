import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="search-container">
      <div class="search-header">
        <h2>Workload Overview</h2>
        <p>Monitor and manage your daily workload statistics</p>
      </div>
      
      <div class="search-bar">
        <div class="search-input-group">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input 
            type="text" 
            [(ngModel)]="searchQuery"
            placeholder="Search workloads, status, or dates..." 
            class="search-input"
            (input)="onSearch()">
          <button class="search-btn" (click)="onSearch()">
            Search
          </button>
        </div>
        
        
      </div>
    </div>
  `,
  styles: [
    `
    .search-container {
      background: #1e293b; /* Same as sidebar background */
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      border: 1px solid #334155; /* Same border as sidebar */
      color: #e2e8f0; /* Same text color as sidebar */
      margin-right: 1rem;
      margin-left: 1rem
    }

    .search-header h2 {
      font-size: 1.5rem;
      font-weight: 700;
      color: white; /* White for better contrast on dark background */
      margin: 0 0 0.5rem 0;
    }

    .search-header p {
      color: #94a3b8; /* Lighter gray for subtitle */
      margin: 0;
      font-size: 0.9rem;
    }

    .search-bar {
      display: flex;
      gap: 1rem;
      align-items: flex-end;
      margin-top: 1.5rem;
      flex-wrap: wrap;
    }

    .search-input-group {
      flex: 1;
      min-width: 300px;
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      left: 12px;
      color: #64748b;
      z-index: 1;
    }

    .search-input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 1px solid #475569; /* Darker border for dark theme */
      border-radius: 8px;
      font-size: 0.9rem;
      transition: all 0.2s ease;
      background: #0f172a; /* Darker background for input */
      color: white; /* White text */
    }

    .search-input:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    .search-input::placeholder {
      color: #64748b; /* Lighter placeholder */
    }

    .search-btn {
      margin-left: 0.5rem;
      padding: 0.75rem 1.5rem;
      background: #3b82f6;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }

    .search-btn:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .search-filters {
      display: flex;
      gap: 0.75rem;
      align-items: center;
    }

    .filter-select {
      padding: 0.75rem;
      border: 1px solid #475569; /* Darker border */
      border-radius: 8px;
      font-size: 0.9rem;
      background: #0f172a; /* Dark background */
      color: white; /* White text */
      transition: all 0.2s ease;
    }

    .filter-select:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    /* Style the dropdown options */
    .filter-select option {
      background: #1e293b;
      color: white;
      padding: 0.5rem;
    }

    @media (max-width: 768px) {
      .search-bar {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-input-group {
        min-width: auto;
      }
      
      .search-filters {
        justify-content: space-between;
      }
      
      .filter-select {
        flex: 1;
      }
    }
    `
  ]
})
export class SearchBarComponent {
  searchQuery = '';
  selectedFilter = 'all';
  selectedDate = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement your search logic here
  }

  onFilterChange() {
    console.log('Filter changed to:', this.selectedFilter);
    // Implement filter logic here
  }

  onDateChange() {
    console.log('Date selected:', this.selectedDate);
    // Implement date filter logic here
  }
}