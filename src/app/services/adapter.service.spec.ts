import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AdapterService } from './adapter.service';

describe('AdapterService', () => {
  let service: AdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(AdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
