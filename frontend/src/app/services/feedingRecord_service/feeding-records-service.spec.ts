import { TestBed } from '@angular/core/testing';

import { FeedingRecordsService } from './feeding-records-service';

describe('FeedingRecordsService', () => {
  let service: FeedingRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedingRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
