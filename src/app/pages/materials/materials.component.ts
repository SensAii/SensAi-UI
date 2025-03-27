// materials.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-in', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardHover', [
      state('normal', style({ transform: 'scale(1)' })),
      state('hovered', style({ transform: 'scale(1.03)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' })),
      transition('normal <=> hovered', animate('200ms ease-in-out'))
    ])
  ]
})
export class MaterialsComponent implements OnInit {
  uploadedMaterials: any[] = [];
  fallbackImage1: string = 'assets/PDF File.gif';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadMaterials();
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: '600px',
      data: { /* pass data if needed */ }
    });

    dialogRef.afterClosed().subscribe((newMaterial: any) => {
      if (newMaterial) {
        this.uploadedMaterials.unshift(newMaterial);
      }
    });
  }

  loadMaterials() {
    this.http.get(`${environment.apiBaseUrl}/api/materials`, {
      withCredentials: true
    }).subscribe({
      next: (response: any) => {
        this.uploadedMaterials = response.materials;
      },
      error: (error) => {
        console.error('Failed to load materials:', error);
        this.snackBar.open('Failed to load materials', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  viewMaterial(materialId: number) {
    this.router.navigate(['/material-view', materialId]);
  }

  getPreviewUrl(material: any): string {
  return this.fallbackImage1;
  }

  guessFileType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension || "unknown";
  }

  onImageError(event: Event, material: any) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = this.fallbackImage1;
    material.previewUrl = this.fallbackImage1;
  }
}