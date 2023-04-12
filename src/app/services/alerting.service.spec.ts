import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AlertingService } from './alerting.service';

describe('AlertingService', () => {
  let service: AlertingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(AlertingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
