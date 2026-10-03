import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard_service/dashboard-service';


@Component({
  selector: 'app-home-content-component',
  imports: [],
  templateUrl: './home-content-component.html',
  styleUrl: './home-content-component.css',
})
export class HomeContentComponent implements OnInit{

  private cdr = inject(ChangeDetectorRef);
  dashboardService = inject(DashboardService);
  totalFourages: number = 0;
  totalAnimals: number = 0;
  totalSuppliers: number = 0 ;
  totalWorkers: number = 0;
  totalGroups: number = 0;
  totalSubGroups: number = 0;
  

  ngOnInit(): void {
    this.getTotalAnimals();
    this.getTotalFourages();
    this.getTotalSuppliers();
    this.getTotalWorkers();
    this.getTotalGroups();
    this.getTotalSubGroups();
    this.cdr.detectChanges();
  }

  getTotalFourages() {
    this.dashboardService.getTotalFourages().subscribe(total => {
      this.totalFourages = total;
    });
  }

  getTotalAnimals() {
    this.dashboardService.getTotalAnimals().subscribe(total => {
      this.totalAnimals = total;
    });
  }

  getTotalSuppliers() {
    this.dashboardService.getTotalSuppliers().subscribe(total => {
      this.totalSuppliers = total;
    });
  }
  
  getTotalWorkers() {
    this.dashboardService.getTotalWorkers().subscribe(total => {
      this.totalWorkers = total;
    });
  }

  getTotalGroups() {
    this.dashboardService.getTotalGroups().subscribe(total => {
      this.totalGroups = total;
    });
  }

  getTotalSubGroups() {
    this.dashboardService.getTotalSubGroups().subscribe(total => {
      this.totalSubGroups = total;
    });
  }
  
}
