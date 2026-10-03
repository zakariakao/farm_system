import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourageEditComponent } from './fourage-edit-component';

describe('FourageEditComponent', () => {
  let component: FourageEditComponent;
  let fixture: ComponentFixture<FourageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourageEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
