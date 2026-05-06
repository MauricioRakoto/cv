import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilList } from './profil-list';

describe('ProfilList', () => {
  let component: ProfilList;
  let fixture: ComponentFixture<ProfilList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilList],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
