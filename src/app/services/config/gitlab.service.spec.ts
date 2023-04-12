import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GitlabService } from './gitlab.service';

describe('GitlabService', () => {
  let service: GitlabService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
    });
    service = TestBed.inject(GitlabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
