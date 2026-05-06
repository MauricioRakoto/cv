import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilDetail } from './profil-detail';

describe('ProfilDetail', () => {
  let component: ProfilDetail;
  let fixture: ComponentFixture<ProfilDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
