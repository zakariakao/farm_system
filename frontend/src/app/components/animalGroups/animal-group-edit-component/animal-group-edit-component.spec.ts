import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalGroupEditComponent } from './animal-group-edit-component';

describe('AnimalGroupEditComponent', () => {
  let component: AnimalGroupEditComponent;
  let fixture: ComponentFixture<AnimalGroupEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalGroupEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
