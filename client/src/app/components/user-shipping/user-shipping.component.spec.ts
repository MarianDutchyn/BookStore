import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserShippingComponent } from './user-shipping.component';

describe('UserShippingComponent', () => {
  let component: UserShippingComponent;
  let fixture: ComponentFixture<UserShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
