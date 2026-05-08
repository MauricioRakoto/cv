import { TestBed } from '@angular/core/testing';

import { Qualite } from './qualite';

describe('Qualite', () => {
  let service: Qualite;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Qualite);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
