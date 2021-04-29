import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KatlamaGridComponent } from './katlama-grid.component';

describe('KatlamaGridComponent', () => {
  let component: KatlamaGridComponent;
  let fixture: ComponentFixture<KatlamaGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KatlamaGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KatlamaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
