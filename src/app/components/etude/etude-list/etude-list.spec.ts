import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudeList } from './etude-list';

describe('EtudeList', () => {
  let component: EtudeList;
  let fixture: ComponentFixture<EtudeList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudeList],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudeList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
