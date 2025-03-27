import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './User/index/index.component';
import { AboutComponent } from './User/about/about.component';
import { ProfileComponent } from './User/profile/profile.component';
import { EditProfileComponent } from './User/edit-profile/edit-profile.component';
import { ShopeComponent } from './User/shope/shope.component';
import { LoginComponent } from './User/login/login.component';
import { SignUpComponent } from './User/sign-up/sign-up.component';
import { SingleProductComponent } from './User/single-product/single-product.component';
import { ProductsComponent } from './User/products/products.component';
import { CategoriesComponent } from './User/categories/categories.component';
import { CartComponent } from './User/cart/cart.component';
import { ContactComponent } from './User/contact/contact.component';
import { CheckoutComponent } from './User/checkout/checkout.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: "about", component: AboutComponent },
  { path: "profile", component: ProfileComponent },
  { path: "editProfile", component: EditProfileComponent },

  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
//{ path: "payment", component: },
  { path: "shope", component: ShopeComponent },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignUpComponent },
  { path: "Product-Details/:id", component: SingleProductComponent },
  { path: "Product", component: ProductsComponent },
  { path: "category", component: CategoriesComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
