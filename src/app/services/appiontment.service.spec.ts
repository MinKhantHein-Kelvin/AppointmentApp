import { TestBed } from '@angular/core/testing';

import { AppiontmentService } from './appiontment.service';

describe('AppiontmentService', () => {
  let service: AppiontmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppiontmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
