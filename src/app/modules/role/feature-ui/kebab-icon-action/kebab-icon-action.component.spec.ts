import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebabIconActionComponent } from './kebab-icon-action.component';

describe('KebabIconActionComponent', () => {
  let component: KebabIconActionComponent;
  let fixture: ComponentFixture<KebabIconActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KebabIconActionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KebabIconActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
