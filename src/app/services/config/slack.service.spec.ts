import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SlackService } from './slack.service';

describe('SlackService', () => {
  let service: SlackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
    });
    service = TestBed.inject(SlackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
