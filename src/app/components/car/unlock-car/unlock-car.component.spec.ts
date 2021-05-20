import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockCarComponent } from './unlock-car.component';

describe('UnlockCarComponent', () => {
  let component: UnlockCarComponent;
  let fixture: ComponentFixture<UnlockCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
