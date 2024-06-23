import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleStaffsComponent } from './role-staffs.component';

describe('RoleStaffsComponent', () => {
  let component: RoleStaffsComponent;
  let fixture: ComponentFixture<RoleStaffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoleStaffsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoleStaffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
