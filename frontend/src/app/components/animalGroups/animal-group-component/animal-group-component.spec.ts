import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalGroupComponent } from './animal-group-component';

describe('AnimalGroupComponent', () => {
  let component: AnimalGroupComponent;
  let fixture: ComponentFixture<AnimalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
