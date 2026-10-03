import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourageStockComponent } from './fourage-stock-component';

describe('FourageStockComponent', () => {
  let component: FourageStockComponent;
  let fixture: ComponentFixture<FourageStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourageStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourageStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
