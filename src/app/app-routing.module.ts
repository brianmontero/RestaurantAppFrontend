import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

import { AdminClientsComponent } from './admin/pages/admin-clients/admin-clients.component';
import { AdminMenuComponent } from './admin/pages/admin-menu/admin-menu.component';
import { AdminSalesComponent } from './admin/pages/admin-sales/admin-sales.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminParentComponent } from './pages/admin-parent/admin-parent.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { DefaultMenuComponent } from './pages/default-menu/default-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PastasComponent } from './pages/pastas/pastas.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { SaladComponent } from './pages/salad/salad.component';
import { VeganoComponent } from './pages/vegano/vegano.component';
import { ProfileComponent } from './client/pages/profile/profile.component';
import { ClientParentComponent } from './pages/client-parent/client-parent.component';
import { FavoritesComponent } from './client/pages/favorites/favorites.component';
import { CartComponent } from './cart-and-checkout/pages/cart/cart.component';
import { BillingComponent } from './cart-and-checkout/pages/billing/billing.component';
import { HistoryComponent } from './client/pages/history/history.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent, children: [
    { path: '', component: DefaultMenuComponent },
    { path: 'pasta', component: PastasComponent },
    { path: 'salad', component: SaladComponent },
    { path: 'vegan', component: VeganoComponent },
    { path: 'breakfast', component: BreakfastComponent }
  ] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminParentComponent, children: [
    { path: '', component: AdminPageComponent },
    { path: 'menu', component: AdminMenuComponent },
    { path: 'clients', component: AdminClientsComponent },
    { path: 'sales', component: AdminSalesComponent }
  ], canActivate: [AdminGuard] },
  { path: 'client', component: ClientParentComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'history', component: HistoryComponent }
  ], canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'billing', component: BillingComponent, canActivate: [AuthGuard] },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
