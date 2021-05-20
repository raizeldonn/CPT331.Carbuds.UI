import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditParkingLocationComponent } from './add-edit-parking-location.component';

describe('AddEditParkingLocationComponent', () => {
  let component: AddEditParkingLocationComponent;
  let fixture: ComponentFixture<AddEditParkingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditParkingLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditParkingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
