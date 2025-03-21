// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="dashboard-content" *ngIf="dashboardData">
        <!-- Your dashboard content here -->
        <div class="stats-cards">
          <div class="stat-card">
            <h3>Total Users</h3>
            <p class="stat-value">{{ dashboardData.totalUsers }}</p>
          </div>
          <div class="stat-card">
            <h3>Active Courses</h3>
            <p class="stat-value">{{ dashboardData.activeCourses }}</p>
          </div>
          <div class="stat-card">
            <h3>Completion Rate</h3>
            <p class="stat-value">{{ dashboardData.completionRate }}%</p>
          </div>
        </div>
      </div>
      
      <button (click)="refreshData()" class="refresh-btn">
        Refresh Data
      </button>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
    }
    
    .dashboard-content {
      margin-top: 20px;
    }
    
    .stats-cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
    
    .stat-card {
      background-color: #fff;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      min-width: 200px;
      flex: 1;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
    }
    
    .refresh-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-weight: 500;
    }
    
    .refresh-btn:hover {
      background-color: #45a049;
    }
  `]
})
export class DashboardComponent implements OnInit {
  dashboardData: any = null;
  user: any = null;
  constructor(private loaderService: LoaderService, private authService : AuthService) {}
  
  ngOnInit() {
    this.loadDashboardData();
    this.user = this.authService.getUser();
    console.log(this.user);
  }
  
  loadDashboardData() {
    // Show loader with message
    this.loaderService.show('Loading dashboard data...');
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      this.dashboardData = {
        totalUsers: 1247,
        activeCourses: 32,
        completionRate: 67
      };
      
      // Hide loader after data is loaded
      this.loaderService.hide();
    }, 2500); // Simulate 2.5 second loading time
  }
  
  refreshData() {
    // Clear existing data to show loading state
    this.dashboardData = null;
    
    // Load data again
    this.loadDashboardData();
  }
}