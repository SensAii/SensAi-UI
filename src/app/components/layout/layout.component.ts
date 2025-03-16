import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component'; 
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';  // ✅ Import RouterModul

@Component({
  selector: 'app-layout',
  standalone: true,  // ✅ Mark as standalone
  imports: [SidebarComponent, NavbarComponent, RouterModule],  // ✅ Import standalone components
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
