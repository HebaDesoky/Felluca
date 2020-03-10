import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DestinationItemComponent } from './components/destinations/destination-item/destination-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BecomeAboatmanComponent } from './components/become-aboatman/become-aboatman.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityListComponent } from './components/cities/city-list/city-list.component';
import { AddOrUpdateCityComponent } from './components/cities/add-or-update-city/add-or-update-city.component';
import { AdminDestListComponent } from './components/admin/admin-destination/admin-dest-list/admin-dest-list.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {  ErrorInterceptor } from './_helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DestinationItemComponent,
    FooterComponent,
    HeaderComponent,
    BecomeAboatmanComponent,
    CitiesComponent,
    CityListComponent,
    AddOrUpdateCityComponent,
    AdminDestListComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
