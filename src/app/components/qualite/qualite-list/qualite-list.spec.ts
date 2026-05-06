import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualiteList } from './qualite-list';

describe('QualiteList', () => {
  let component: QualiteList;
  let fixture: ComponentFixture<QualiteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QualiteList],
    }).compileComponents();

    fixture = TestBed.createComponent(QualiteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
