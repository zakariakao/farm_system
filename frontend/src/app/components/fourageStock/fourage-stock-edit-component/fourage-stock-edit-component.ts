import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FourageStockService } from '../../../services/fourageStock_service/fourage-stock-service';
import { Fourage } from '../../../models/fourage.model';
import { FourageService } from '../../../services/fourage_service/fourage-service';
import { FourageStock } from '../../../models/fourageStock.model';
import { FormsModule } from '@angular/forms';
import { Supplier } from '../../../models/supplier.model';
import { SupplierService } from '../../../services/supplier_service/supplier-service';

@Component({
  selector: 'app-fourage-stock-edit-component',
  imports: [FormsModule],
  templateUrl: './fourage-stock-edit-component.html',
  styleUrl: './fourage-stock-edit-component.css',
})
export class FourageStockEditComponent implements OnInit{

  constructor(private route: ActivatedRoute){}

  fourageStockService = inject(FourageStockService);
  fourageStock: any = {};
  fourages : Fourage[] = [];
  fourageService = inject(FourageService);
  suppliers: Supplier[] = [];
  supplierService = inject(SupplierService);
  fourageStockId: string | null = null;
  private cdr = inject(ChangeDetectorRef);

  updatedFourageStock = {
     name: '' ,
     fourage_id: '',
     supplier_id: '' ,
     quantity:0 ,
     alert_threshold:0 ,
  };

  loadFourages() {
    this.fourageService.getAllFourages().subscribe(fouragess =>  {
      this.fourages = fouragess;
    })
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(supplierss => {
      this.suppliers = supplierss;
    })
  }

  loadFourageStock() {
    if(this.fourageStockId) {
      this.fourageStockService.getFourageStock(this.fourageStockId).subscribe(fouragestock => {
        this.fourageStock = fouragestock;
        this.cdr.detectChanges();
      });
    }
  }

  ngOnInit(): void {
    this.fourageStockId = this.route.snapshot.paramMap.get('id');
    this.loadSuppliers();
    this.loadFourages();
    this.loadFourageStock();
  }

  updateFourageStock() {
    if (!this.fourageStockId) return ;

    this.fourageStockService.updateFourageStock(this.fourageStockId, this.updatedFourageStock as FourageStock).subscribe({
      next: (response) => {
        console.log("Updated Successfully: ", response);
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error Updating the stock: ', error);
      }
    });
  }

  resetForm() {
    this.updatedFourageStock = {
     name: '' ,
     fourage_id: '',
     supplier_id: '' ,
     quantity:0 ,
     alert_threshold:0 ,
  };
  }
  
}
