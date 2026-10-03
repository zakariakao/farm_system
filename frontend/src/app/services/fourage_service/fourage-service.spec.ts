import { TestBed } from '@angular/core/testing';

import { FourageService } from './fourage-service';

describe('FourageService', () => {
  let service: FourageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FourageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
