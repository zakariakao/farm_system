import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeddingRecordComponent } from './fedding-record-component';

describe('FeddingRecordComponent', () => {
  let component: FeddingRecordComponent;
  let fixture: ComponentFixture<FeddingRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeddingRecordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeddingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
