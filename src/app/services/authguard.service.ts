import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpClient, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.http.get(`${environment.apiBaseUrl}/api/user/auth`, { withCredentials: true }).pipe(
      map((user: any) => {
        console.log('User authenticated:', user);
        return true; // Allow access
      }),
      catchError(() => {
        console.log('Not authenticated! Redirecting to login.');
        this.router.navigate(['/login']);
        return of(false); // Block access
      })
    );
  }
}
