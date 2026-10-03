import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SupplierService } from '../../../services/supplier_service/supplier-service';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from '../../../models/supplier.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-supplier-edit-component',
  imports: [FormsModule],
  templateUrl: './supplier-edit-component.html',
  styleUrl: './supplier-edit-component.css',
})
export class SupplierEditComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  supplierId: string | null = null;
  supplier: any = {};
  supplierService = inject(SupplierService);
  private cdr = inject(ChangeDetectorRef);

  updatedSupplier = {
    name: '',
    phone: '',
    email: ''
  };

  ngOnInit(): void {
    this.supplierId = this.route.snapshot.paramMap.get('id');
    if (this.supplierId) {
      this.supplierService.getSupplier(this.supplierId).subscribe(supplierr => {
        this.supplier = supplierr;
        this.cdr.detectChanges();
      });
    }
  }

  updateSupplier() {
     if (!this.supplierId) return;

     this.supplierService.updateSupplier(this.supplierId, this.updatedSupplier as Supplier).subscribe({
      next: (response) => {
        console.log("Updated Successfully: ", response);
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (error) => {
        if (error.status === 400) {
          if (!this.updatedSupplier.email || !this.updatedSupplier.name || !this.updatedSupplier.phone) {
            console.error('You must fill all the fields');
          }
          else {
            console.log('The name and email must be unique');
          }
        }
         console.log('Error Updating the supplier: ', error);
      }
     });
  }

  resetForm() {
    this.updatedSupplier = {
     name: '',
     phone: '',
     email: ''
    };
  } 

}
