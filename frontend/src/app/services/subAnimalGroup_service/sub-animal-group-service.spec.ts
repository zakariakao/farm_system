import { TestBed } from '@angular/core/testing';

import { SubAnimalGroupService } from './sub-animal-group-service';

describe('SubAnimalGroupService', () => {
  let service: SubAnimalGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubAnimalGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
