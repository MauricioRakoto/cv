import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteForm } from './qualite-form';

describe('QualiteForm', () => {
  let component: QualiteForm;
  let fixture: ComponentFixture<QualiteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualiteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(QualiteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
