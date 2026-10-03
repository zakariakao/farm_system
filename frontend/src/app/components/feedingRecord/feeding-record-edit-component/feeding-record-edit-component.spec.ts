import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedingRecordEditComponent } from './feeding-record-edit-component';

describe('FeedingRecordEditComponent', () => {
  let component: FeedingRecordEditComponent;
  let fixture: ComponentFixture<FeedingRecordEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedingRecordEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedingRecordEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
