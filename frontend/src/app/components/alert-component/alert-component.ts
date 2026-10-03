import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FourageStock } from '../../models/fourageStock.model';
import { FourageStockService } from '../../services/fourageStock_service/fourage-stock-service';

@Component({
  selector: 'app-alert-component',
  imports: [],
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.css',
})
export class AlertComponent implements OnInit {

  alerts: FourageStock[] = [];
  stockService = inject(FourageStockService);
  private cdr = inject(ChangeDetectorRef);

  loadAlerts(){
    this.stockService.getLowStocks().subscribe(alertss => {
       this.alerts = alertss;
       this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.loadAlerts();
  }

}
