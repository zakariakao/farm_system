import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupEditComponent } from './sub-group-edit-component';

describe('SubGroupEditComponent', () => {
  let component: SubGroupEditComponent;
  let fixture: ComponentFixture<SubGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubGroupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
