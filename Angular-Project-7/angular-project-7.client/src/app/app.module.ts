import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './User/index/index.component';
import { AboutComponent } from './User/about/about.component';
import { ContactComponent } from './User/contact/contact.component';
import { ShopeComponent } from './User/shope/shope.component';
import { ProductsComponent } from './User/products/products.component';
import { SingleProductComponent } from './User/single-product/single-product.component';
import { CategoriesComponent } from './User/categories/categories.component';
import { ProfileComponent } from './User/profile/profile.component';
import { EditProfileComponent } from './User/edit-profile/edit-profile.component';
import { OrdersHistoryComponent } from './User/orders-history/orders-history.component';
import { CartComponent } from './User/cart/cart.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { NavbarComponent } from './User/navbar/navbar.component';
import { FooterComponent } from './User/footer/footer.component';
import { SidebarComponent } from './User/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './User/checkout/checkout.component';
@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    ShopeComponent,
    ProductsComponent,
    SingleProductComponent,
    CategoriesComponent,
    ProfileComponent,
    EditProfileComponent,
    OrdersHistoryComponent,
    CartComponent,
    LoginComponent,
    SignUpComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
