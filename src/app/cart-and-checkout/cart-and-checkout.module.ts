import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CartComponent } from './pages/cart/cart.component';
import { BillingComponent } from './pages/billing/billing.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CartDetailsComponent } from './cart-details/cart-details.component';
import { CartDesignComponent } from './cart-design/cart-design.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { BillingDesignComponent } from './billing-design/billing-design.component';

@NgModule({
  declarations: [
    CartComponent,
    BillingComponent,
    PaymentComponent,
    CartDetailsComponent,
    CartDesignComponent,
    CartItemsComponent,
    CartItemComponent,
    BillingDesignComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CartDesignComponent,
    CartComponent
  ]
})
export class CartAndCheckoutModule { }
