import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './dashboard/home/home.component';
import { EditprofileComponent } from './auth/editprofile/editprofile.component';
import { AuthInterceptor } from './auth.interceptor';
import { LogoutComponent } from './auth/logout/logout.component';
import { NewProductComponent } from './dashboard/new-product/new-product.component';
import { Error404Component } from './dashboard/error404/error404.component';
import { ProductIdComponent } from './dashboard/product-id/product-id.component';
import { Location } from '@angular/common';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { GestionUserComponent } from './home/gestion-user/gestion-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    EditprofileComponent,
    NewProductComponent,
    Error404Component,
    ProductIdComponent,
    SidebarComponent,
    GestionUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
