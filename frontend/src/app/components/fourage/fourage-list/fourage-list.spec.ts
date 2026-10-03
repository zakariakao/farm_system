import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourageList } from './fourage-list';

describe('FourageList', () => {
  let component: FourageList;
  let fixture: ComponentFixture<FourageList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FourageList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourageList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
