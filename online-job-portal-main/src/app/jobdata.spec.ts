import { TestBed } from '@angular/core/testing';

import { Jobdata } from './jobdata';

describe('Jobdata', () => {
  let service: Jobdata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Jobdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
