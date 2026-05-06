import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudeForm } from './etude-form';

describe('EtudeForm', () => {
  let component: EtudeForm;
  let fixture: ComponentFixture<EtudeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EtudeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
