import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourageComponent } from './fourage-component';

describe('FourageComponent', () => {
  let component: FourageComponent;
  let fixture: ComponentFixture<FourageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
