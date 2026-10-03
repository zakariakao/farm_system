import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComonent } from './test-comonent';

describe('TestComonent', () => {
  let component: TestComonent;
  let fixture: ComponentFixture<TestComonent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComonent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestComonent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
