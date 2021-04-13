import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingLocationOverviewComponent } from './parking-location-overview.component';

describe('ParkingLocationOverviewComponent', () => {
  let component: ParkingLocationOverviewComponent;
  let fixture: ComponentFixture<ParkingLocationOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingLocationOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingLocationOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
