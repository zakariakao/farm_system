import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FourageStockService } from '../../../services/fourageStock_service/fourage-stock-service';
import { FourageStock } from '../../../models/fourageStock.model';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { FeedingRecord } from '../../../models/feedingRecord.model';
import { FeedingRecordsService } from '../../../services/feedingRecord_service/feeding-records-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-fedding-record-component',
  imports: [FormsModule, RouterLink],
  templateUrl: './fedding-record-component.html',
  styleUrl: './fedding-record-component.css',
})
export class FeddingRecordComponent implements OnInit {
  feedingRecords: FeedingRecord[] = [];
  fourageStocks: FourageStock[] = [];
  subGroups: SubAnimalGroup[] = [];
  
  feedingRecordService = inject(FeedingRecordsService);
  fourageStockService = inject(FourageStockService);
  subGroupService = inject(SubAnimalGroupService);
  private cdr = inject(ChangeDetectorRef);

  isWarning: Boolean = false;
  warningContent: string = '';
  isSucces: Boolean = false;
  succesContent: string = '';
  isError: Boolean = false;
  errorContent: string = '';

  newFeedingRecord = {
    subgroup_id: '',
    fourage_stock_id: '',
    quantity: 0,
    datetime: 0
  };

  ngOnInit(): void {
    this.loadFeedingRecords();
    this.loadFourageStocks();
    this.loadSubGroups();
  }

  loadFeedingRecords(): void {
    this.feedingRecordService.getAllFeedingRecords().subscribe(feedings => {
      this.feedingRecords = feedings;
      this.cdr.detectChanges();
    });
  }

  loadFourageStocks(): void {
    this.fourageStockService.getAllFourageStocks().subscribe(fouragestocks => {
      this.fourageStocks = fouragestocks;
    });
  }

  loadSubGroups(): void {
    this.subGroupService.getAllSubAnimalGroups().subscribe(subgroups => {
      this.subGroups = subgroups;
    });
  }

  addFeedingRecord() {
    
    this.feedingRecordService.createFeedingRecord(this.newFeedingRecord as unknown as FeedingRecord).subscribe({
      next: (response) => {
        console.log('feeding record added successfully:', response);
        this.succesContent = 'Stock Created succesfly';
          this.isSucces = true;
          setTimeout(() => {
            this.isSucces = false;
            this.cdr.detectChanges();
          }, 3000);
        this.resetForm();
        this.loadFeedingRecords();
      },
      error: (error) => {
        if (error.status === 400) {
          if (!this.newFeedingRecord.subgroup_id || !this.newFeedingRecord.fourage_stock_id || 
        this.newFeedingRecord.quantity <= 0 || this.newFeedingRecord.datetime < 0) {
          this.warningContent = 'Please fill all the fields' ;
              this.isWarning = true;
              this.cdr.detectChanges();
              setTimeout(() => {
                this.isWarning = false;
                this.cdr.detectChanges();
              }, 3000);
        }
        
        }
        console.error('Error adding feeding record:', error);
      }
    });
  }

  resetForm() {
    this.newFeedingRecord = {
      subgroup_id: '',
      fourage_stock_id: '',
      quantity: 0,
      datetime: 0
    };
  }

  deleteFeedingRecord(id: string) {
    this.feedingRecordService.deleteFeedingRecord(id).subscribe({
      next: (response) => {
        console.log('Deleted successfully:', response);
        this.loadFeedingRecords();
      },
      error: (error) => {
        console.error('Error deleting fourage stock:', error);
      }
    });
  }

  getSubGroupName(subgroup_id: string | any): string {
    // Handle null or undefined
    if (!subgroup_id) {
      return 'N/A';
    }
    
    // If subgroup_id is already populated as an object, return its name
    if (typeof subgroup_id === 'object' && subgroup_id?.name) {
      return subgroup_id.name;
    }
    
    // Otherwise, search in the subGroups array
    const subGroup = this.subGroups.find(s => s.id === subgroup_id);
    return subGroup ? subGroup.name : 'Unknown';
  }

  getFourageStockName(fourage_stock_id: string | any): string {
    // Handle null or undefined
    if (!fourage_stock_id) {
      return 'N/A';
    }
    
    // If fourage_stock_id is already populated as an object, return its name
    if (typeof fourage_stock_id === 'object' && fourage_stock_id?.name) {
      return fourage_stock_id.name;
    }
    
    // Otherwise, search in the fourageStocks array
    const fourageStock = this.fourageStocks.find(fs => fs.id === fourage_stock_id);
    return fourageStock ? fourageStock.name : 'Unknown';
  }
}
