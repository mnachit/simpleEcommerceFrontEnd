import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './dashboard/home/home.component';
import { checkTokenGuard } from './guard/check-token.guard';
import { EditprofileComponent } from './auth/editprofile/editprofile.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { NewProductComponent } from './dashboard/new-product/new-product.component';
import { Error404Component } from './dashboard/error404/error404.component';
import { ProductIdComponent } from './dashboard/product-id/product-id.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [checkTokenGuard] },
  { path: 'product/:id', component: ProductIdComponent, canActivate: [checkTokenGuard]},
  { path: 'new/product', component: NewProductComponent, canActivate: [checkTokenGuard] },
  { path: 'profile', component: EditprofileComponent, canActivate: [checkTokenGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [checkTokenGuard] },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
