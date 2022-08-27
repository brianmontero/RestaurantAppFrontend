import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDesignComponent } from './cart-design.component';

describe('CartDesignComponent', () => {
  let component: CartDesignComponent;
  let fixture: ComponentFixture<CartDesignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartDesignComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
