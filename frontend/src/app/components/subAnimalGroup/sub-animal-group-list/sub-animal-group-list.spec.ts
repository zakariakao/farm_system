import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAnimalGroupList } from './sub-animal-group-list';

describe('SubAnimalGroupList', () => {
  let component: SubAnimalGroupList;
  let fixture: ComponentFixture<SubAnimalGroupList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAnimalGroupList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubAnimalGroupList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
