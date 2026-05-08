import { TestBed } from '@angular/core/testing';

import { Loisirs } from './loisirs';

describe('Loisirs', () => {
  let service: Loisirs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Loisirs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
