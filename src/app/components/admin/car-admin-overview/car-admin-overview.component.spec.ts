import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarAdminOverviewComponent } from './car-admin-overview.component';

describe('CarAdminOverviewComponent', () => {
  let component: CarAdminOverviewComponent;
  let fixture: ComponentFixture<CarAdminOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarAdminOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarAdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
