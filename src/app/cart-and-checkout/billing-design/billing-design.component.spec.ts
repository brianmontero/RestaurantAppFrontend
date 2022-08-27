import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingDesignComponent } from './billing-design.component';

describe('BillingDesignComponent', () => {
  let component: BillingDesignComponent;
  let fixture: ComponentFixture<BillingDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
