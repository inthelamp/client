import { TestBed } from '@angular/core/testing';

import { VarsFileService } from './varsFile.service';

describe('VarsFileService', () => {
  let service: VarsFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VarsFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
