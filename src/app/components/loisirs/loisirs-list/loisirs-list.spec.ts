import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoisirsList } from './loisirs-list';

describe('LoisirsList', () => {
  let component: LoisirsList;
  let fixture: ComponentFixture<LoisirsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoisirsList],
    }).compileComponents();

    fixture = TestBed.createComponent(LoisirsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
