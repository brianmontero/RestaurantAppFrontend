import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { ToastrModule } from 'ngx-toastr';
import { CartAndCheckoutModule } from './cart-and-checkout/cart-and-checkout.module';

// PROVIDERS
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt'
import { AuthService } from './services/auth.service';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { MenuContainerComponent } from './components/menu-container/menu-container.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDesignComponent } from './components/product-design/product-design.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoginComponent } from './pages/login/login.component';
import { PastasComponent } from './pages/pastas/pastas.component';
import { VeganoComponent } from './pages/vegano/vegano.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { DefaultMenuComponent } from './pages/default-menu/default-menu.component';
import { BreakfastComponent } from './pages/breakfast/breakfast.component';
import { SaladComponent } from './pages/salad/salad.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { AdminParentComponent } from './pages/admin-parent/admin-parent.component';
import { ClientParentComponent } from './pages/client-parent/client-parent.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    MenuComponent,
    HomeComponent,
    MenuContainerComponent,
    MenuItemComponent,
    ProductComponent,
    ProductDesignComponent,
    CommentComponent,
    LoginComponent,
    PastasComponent,
    VeganoComponent,
    RegisterComponent,
    NotFoundComponent,
    DefaultMenuComponent,
    BreakfastComponent,
    SaladComponent,
    AdminPageComponent,
    AdminParentComponent,
    ClientParentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AuthenticationModule,
    AdminModule,
    ClientModule,
    CartAndCheckoutModule
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
