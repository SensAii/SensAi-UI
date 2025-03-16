import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Input() collapsed: boolean = false; // Allow sidebar collapse control
  isCollapsed = this.collapsed;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}
