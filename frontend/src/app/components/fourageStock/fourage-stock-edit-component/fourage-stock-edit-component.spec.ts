import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourageStockEditComponent } from './fourage-stock-edit-component';

describe('FourageStockEditComponent', () => {
  let component: FourageStockEditComponent;
  let fixture: ComponentFixture<FourageStockEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourageStockEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourageStockEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
