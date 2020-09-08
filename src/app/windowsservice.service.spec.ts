import { TestBed } from '@angular/core/testing';

import { WindowsserviceService } from './windowsservice.service';

describe('WindowsserviceService', () => {
  let service: WindowsserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowsserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
