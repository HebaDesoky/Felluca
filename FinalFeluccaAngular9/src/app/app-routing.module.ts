import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LogInComponent } from '../app/components/log-in/log-in.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { BookPageComponent } from './components/book-page/book-page.component';
import { AddDestComponent } from './components/add-dest/add-dest.component';
import { DestinationsComponent } from './components/destinations/destinations.component';
import { AddOrUpdateDestinationComponent } from './components/destinations/add-or-update-destination/add-or-update-destination.component';
import { DestinationListComponent } from './components/destinations/destination-list/destination-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoatsComponent } from './components/boats/boats.component';
import { AddOrUpdateBoatsComponent } from './components/boats/add-or-update-boats/add-or-update-boats.component';
import { BoatsListComponent } from './components/boats/boats-list/boats-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminCityComponent } from './components/admin/admin-city/admin-city.component';
import { UserComponent } from './components/user/user.component';
import { AddOrUpdateComponent } from './components/user/add-or-update/add-or-update.component';
import { AddDestinationComponent } from './components/destinations/add-destination/add-destination.component';
import { AdminDestinationComponent } from './components/admin/admin-destination/admin-destination.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BoatManComponent } from './components/_person/boat-man/boat-man.component';
import { AddOrUpdateBoatmanComponent } from './components/_person/boat-man/add-or-update-boatman/add-or-update-boatman.component';
import { BoatmanListComponent } from './components/_person/boat-man/boatman-list/boatman-list.component';
import { AddOrUpdatePersonComponent } from './components/log-in/person/add-or-update-person/add-or-update-person.component';
import { PersonComponent } from './components/log-in/person/person.component';
import { PersonListComponent } from './components/log-in/person/person-list/person-list.component';

import{ AuthGuard} from './_helpers/auth.guard'
import { from } from 'rxjs';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "admin", component: AdminComponent },
  { path: 'book', component: BookPageComponent }, //canActivate:[AuthGuard]},
  { path: 'log-in', component: LogInComponent },
  //{ path: '**', redirectTo: '' },
  
];

export const appRoutingModule = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    LogInComponent,
    NotFoundComponent,
    HomeComponent,
    OffersComponent,
    BookPageComponent,
    AddDestComponent,
    DestinationsComponent,
    AddOrUpdateDestinationComponent,
    DestinationListComponent,
    BoatsComponent,
    AddOrUpdateBoatsComponent,
    BoatsListComponent,
    AdminComponent,
    AdminCityComponent,
    UserComponent,
    AddOrUpdateComponent,
    AddDestinationComponent,
    AdminDestinationComponent,
    SearchBarComponent,
    BoatManComponent,
    AddOrUpdateBoatmanComponent,
    BoatmanListComponent,
    PersonComponent,
    AddOrUpdatePersonComponent,
    PersonListComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
