import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdminOverviewComponent } from './user-admin-overview.component';

describe('UserAdminOverviewComponent', () => {
  let component: UserAdminOverviewComponent;
  let fixture: ComponentFixture<UserAdminOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAdminOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdminOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
