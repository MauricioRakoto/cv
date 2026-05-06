import { TestBed } from '@angular/core/testing';

import { Langue } from './langue';

describe('Langue', () => {
  let service: Langue;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Langue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
