import { TestBed } from '@angular/core/testing';

import { FourageStockService } from './fourage-stock-service';

describe('FourageStockService', () => {
  let service: FourageStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FourageStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
