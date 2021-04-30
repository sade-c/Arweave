import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileKatlamaStatusComponent } from './profile-katlama-status.component';

describe('ProfileKatlamaStatusComponent', () => {
  let component: ProfileKatlamaStatusComponent;
  let fixture: ComponentFixture<ProfileKatlamaStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileKatlamaStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileKatlamaStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
