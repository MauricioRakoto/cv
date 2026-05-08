import { TestBed } from '@angular/core/testing';

import { Etude } from './etude';

describe('Etude', () => {
  let service: Etude;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Etude);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
