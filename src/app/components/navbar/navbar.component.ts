import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  logout() {
    fetch(`${environment.apiBaseUrl}/api/auth/logout`, { credentials: 'include' })
      .then(response => response.json())
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.error('Logout failed:', error));
  }
  
}
