import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PredictionService } from './prediction.service';

describe('PredictionService', () => {
  let service: PredictionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PredictionService]
    });
    service = TestBed.inject(PredictionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
