import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueForm } from './langue-form';

describe('LangueForm', () => {
  let component: LangueForm;
  let fixture: ComponentFixture<LangueForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangueForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LangueForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
