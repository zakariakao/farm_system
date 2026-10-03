import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FourageStock } from '../../../models/fourageStock.model';
import { FourageStockService } from '../../../services/fourageStock_service/fourage-stock-service';
import { Fourage } from '../../../models/fourage.model';
import { Supplier } from '../../../models/supplier.model';
import { FourageService } from '../../../services/fourage_service/fourage-service';
import { SupplierService } from '../../../services/supplier_service/supplier-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fourage-stock-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './fourage-stock-component.html',
  styleUrl: './fourage-stock-component.css',
})
export class FourageStockComponent implements OnInit {

  fourageStocks: FourageStock[] = [];
  fourages: Fourage[] = [];
  suppliers: Supplier[] = [];
  fourageStockService = inject(FourageStockService);
  fourageService = inject(FourageService);
  supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  newFourageStock = {
    name: '',
    fourage_id: '',
    supplier_id: '',
    quantity: 0,
    alert_threshold: 0,
  };

  ngOnInit(): void {
    this.loadFourageStocks();
    this.loadFourages();
    this.loadSuppliers();
  }

  loadFourageStocks() {
    this.fourageStockService.getAllFourageStocks().subscribe(stocks => {
      this.fourageStocks = stocks;
      this.cdr.detectChanges();
    });
  }

  loadFourages() {
    this.fourageService.getAllFourages().subscribe(fouragess => {
      this.fourages = fouragess;
    });
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(supplierss => {
      this.suppliers = supplierss;
    });
  }

  addFourageStock() {    
    
    this.fourageStockService.createFourageStock(this.newFourageStock as any).subscribe({
      next: (stock) => {
        this.succesContent = 'Stock Created succesfly';
          this.isSucces = true;
          setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
        this.loadFourageStocks();
        this.resetForm();
      },
      error: (error) => {
        if (error.status === 400) {
          if (!this.newFourageStock.name || !this.newFourageStock.fourage_id || 
        !this.newFourageStock.supplier_id || this.newFourageStock.quantity <= 0 || 
        this.newFourageStock.alert_threshold <= 0){
           this.warningContent = 'Please fill all the fields' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
        }
        else  {
          this.errorContent = 'The name is already exists Its be a unique name';
              this.isError = true;
              this.cdr.detectChanges();
              setTimeout(()=> {
                this.isError = false;
                this.cdr.detectChanges();
              }, 3000);
        }
        }
        console.error('Error adding fourage stock:', error);
      }
    });
  }

  deleteFourageStock(id: string) {
    

    this.fourageStockService.deleteFourageStock(id).subscribe({
      next: () => {
        this.fourageStocks = this.fourageStocks.filter(stock => stock.id !== id);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error deleting fourage stock:', error);
      }
    });
  }

  getFourageName(fourage_id: string | any): string {
    // If fourage_id is already populated as an object, return its name
    if (typeof fourage_id === 'object' && fourage_id?.name) {
      return fourage_id.name;
    }
    
    // Otherwise, search in the fourages array
    const fourage = this.fourages.find(f => f.id === fourage_id);
    return fourage ? fourage.name : 'Unknown';
  }

  getSupplierName(supplier_id: string | any): string {
    // If supplier_id is already populated as an object, return its name
    if (typeof supplier_id === 'object' && supplier_id?.name) {
      return supplier_id.name;
    }
    
    // Otherwise, search in the suppliers array
    const supplier = this.suppliers.find(s => s.id === supplier_id);
    return supplier ? supplier.name : 'Unknown';
  }

  resetForm() {
    this.newFourageStock = {
      name: '',
      fourage_id: '',
      supplier_id: '',
      quantity: 0,
      alert_threshold: 0,
    };
  }

}
