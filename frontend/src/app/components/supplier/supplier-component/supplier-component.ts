import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Supplier } from '../../../models/supplier.model';
import { SupplierService } from '../../../services/supplier_service/supplier-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-supplier-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './supplier-component.html',
  styleUrl: './supplier-component.css',
})
export class SupplierComponent implements OnInit {

  suppliers: Supplier[] = [];
  supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  newSupplier = {
    name: '',
    phone: '', 
    email: ''
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe(supplierss => {
      this.suppliers = supplierss;
      this.cdr.detectChanges();
    });
  }

  resetForm() {
    this.newSupplier = {
      name: '',
      phone: '', 
      email: ''
    }
  }

  addSupplier() {
   

    this.supplierService.createSupplier(this.newSupplier as Supplier).subscribe({
      next: (response) => {
        console.log('Added supplier: ', response);
        this.succesContent = 'Supplier Created succesfly';
          this.isSucces = true;
          setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
        this.resetForm();
        this.loadSuppliers();
      },
      error: (error) => {
        if(error.status === 400) {
          if (!this.newSupplier.name || !this.newSupplier.phone || !this.newSupplier.email) {
            console.error('You must fill all the fields');
            this.warningContent = 'Please fill all the fields' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
          }
          else {
            console.error('The name and email must be unique');
             this.errorContent = 'The name and email must be unique';
              this.isError = true;
              this.cdr.detectChanges();
              setTimeout(()=> {
                this.isError = false;
                this.cdr.detectChanges();
              }, 3000);
          }
        }
        console.log("Can't Add supplier: ", error);
      }
    });
  }

  deleteSupplier(id: string) {
    this.supplierService.deleteSupplier(id).subscribe({
      next: (response) => {
        console.log('Deleted successfly: ', response);
        this.loadSuppliers();
      },
      error: (error) => {
        console.log('Error deleting supplier: ', error);
      }
    });
  }

}
