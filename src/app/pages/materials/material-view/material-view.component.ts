import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { environment } from '../../../../environments/environment';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { NgxExtendedPdfViewerService } from 'ngx-extended-pdf-viewer';
import { LoaderService } from '../../../services/loader.service';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-materials-view',
  standalone: true,
  imports: [CommonModule, MatSnackBarModule, NgxExtendedPdfViewerModule, MatIconModule],
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss'],
})
export class MaterialViewComponent implements OnInit {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private pdfService = inject(NgxExtendedPdfViewerService);

  materialId!: number;
  materials: any
  pdfUrl: string = '';
  selectedText: string = '';
  highlights: { text: string; color: string }[] = [];
  pdfFailed: boolean = false;

  constructor(private loaderService: LoaderService) {
    pdfDefaultOptions.cursorToolOnLoad = 0; // Set the default cursor tool to "Text Selection"
  }

  ngOnInit(): void {
    this.materialId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.materialId) {
      this.loadMaterial();
    }
  }

  loadMaterial() {
    this.loaderService.show('Loading material...');  // Show loader
    this.http.get(`${environment.apiBaseUrl}/api/materials/material/${this.materialId}`, {
      withCredentials: true
    }).subscribe({
      next: (response: any) => {
        if (response.materials && response.materials.length > 0) {
          this.materials = response.materials[0];
          this.pdfUrl = `${response.materials[0].firebase_url}?t=${new Date().getTime()}`;
        } else {
          this.loaderService.hide();  // Hide loader on failure
          this.snackBar.open('Material not found', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
      },
      error: () => {
        this.loaderService.hide();  // Hide loader on failure
        this.snackBar.open('Failed to load material', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }

  onPdfLoaded() {
    console.log('PDF loaded successfully');
    this.loaderService.hide();  // Hide loader when PDF is fully loaded
  }

  onError(event: any) {
    this.pdfFailed = true
    console.error('Error loading PDF:', event);
    if (event !== true) {
    this.snackBar.open('Failed to load PDF', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    this.loaderService.hide(); // Hide loader on PDF error
    }
  }

  onTextSelected(event: any) {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      this.selectedText = selection.toString();
    }
  }

  isLoading(): boolean {
    return this.loaderService.isLoading(); // Check if loader is active
  }

async savePdf() {
  this.loaderService.show('Saving PDF...');
  const pdfBlob = await this.pdfService.getCurrentDocumentAsBlob();
  if (!pdfBlob) {
    this.loaderService.hide();
    this.snackBar.open('Failed to export PDF', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    return;
  }
  const fileName = `${this.materials.file_name}.pdf`;
  const formData = new FormData();
    formData.append('file', pdfBlob, fileName);
  this.http.put(`${environment.apiBaseUrl}/api/materials/update/${this.materialId}`, formData,{
    withCredentials: true
  }).subscribe({
    next: (response: any) => {
      if (response.material && response.material.firebase_url) {
        this.pdfUrl = `${response.material.firebase_url}?t=${new Date().getTime()}`;
      } else {
        this.loaderService.hide();
        this.snackBar.open('PDF Saved Successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
      }
    },
    error: () => {
      this.loaderService.hide();
      this.snackBar.open('Failed to Save PDF', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
    }
  });
}
}

