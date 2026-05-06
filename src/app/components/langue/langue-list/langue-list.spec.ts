import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangueList } from './langue-list';

describe('LangueList', () => {
  let component: LangueList;
  let fixture: ComponentFixture<LangueList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LangueList],
    }).compileComponents();

    fixture = TestBed.createComponent(LangueList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
