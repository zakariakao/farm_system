import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedingRecordsService } from '../../../services/feedingRecord_service/feeding-records-service';
import { SubAnimalGroup } from '../../../models/subAnimalGroup.model';
import { SubAnimalGroupService } from '../../../services/subAnimalGroup_service/sub-animal-group-service';
import { FourageStock } from '../../../models/fourageStock.model';
import { FourageStockService } from '../../../services/fourageStock_service/fourage-stock-service';
import { FeedingRecord } from '../../../models/feedingRecord.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-feeding-record-edit-component',
  imports: [FormsModule],
  templateUrl: './feeding-record-edit-component.html',
  styleUrl: './feeding-record-edit-component.css',
})
export class FeedingRecordEditComponent implements OnInit {

  constructor(private route: ActivatedRoute){}

  feedingId: string | null = null;
  feedingRecord: any = {};
  feedingRecordService = inject(FeedingRecordsService);
  subGroups: SubAnimalGroup[] = [];
  subGroupService = inject(SubAnimalGroupService);
  fourageStocks: FourageStock[] = [];
  fourageStockService = inject(FourageStockService);
  private cdr = inject(ChangeDetectorRef);

  updatedFeedingRecord = {
    subgroup_id: '',
    fourage_stock_id: '',
    quantity: 0,
    datetime: ''
  };

  ngOnInit(): void {
    this.feedingId = this.route.snapshot.paramMap.get('id');
    this.loadSubGroups();
    this.loadFourageStocks();
    this.loadFeedingRecord();
  }

  loadFeedingRecord() {
    if(this.feedingId) {
      this.feedingRecordService.getFeedingRecord(this.feedingId).subscribe(
        feeding => {
          this.feedingRecord = feeding;
          this.cdr.detectChanges();
        }
      );
    }
  }

  loadSubGroups() {
    this.subGroupService.getAllSubAnimalGroups().subscribe(subgroups => {
      this.subGroups = subgroups;
    });
  }

  loadFourageStocks() {
    this.fourageStockService.getAllFourageStocks().subscribe(stocks => {
      this.fourageStocks = stocks;
    });
  }

  updateFeedingRecord() {
    if(!this.feedingId) return ;

    this.feedingRecordService.updateFeedingRecord(this.feedingId, this.updatedFeedingRecord as unknown as FeedingRecord).subscribe({
      next: (response) => {
        console.log('Updated Succesfly: ', response);
        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error updating the feeding: ', error);
      }
    });
  }

  resetForm() {
    this.updatedFeedingRecord = {
    subgroup_id: '',
    fourage_stock_id: '',
    quantity: 0,
    datetime: ''
  };
  }
  
}
