import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loaderService.show();  // Show Loader

    setTimeout(() => {
      this.loaderService.hide();  // Hide Loader after 3 seconds
    }, 3000);
  }
}
