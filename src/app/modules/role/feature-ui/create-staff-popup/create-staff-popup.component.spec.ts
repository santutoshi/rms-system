import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateStaffPopupComponent } from './create-staff-popup.component';

describe('CreateStaffPopupComponent', () => {
  let component: CreateStaffPopupComponent;
  let fixture: ComponentFixture<CreateStaffPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStaffPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateStaffPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
