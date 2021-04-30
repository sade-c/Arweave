import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileKatlamaComponent } from './profile-katlama.component';

describe('ProfileKatlamaComponent', () => {
  let component: ProfileKatlamaComponent;
  let fixture: ComponentFixture<ProfileKatlamaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileKatlamaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileKatlamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
