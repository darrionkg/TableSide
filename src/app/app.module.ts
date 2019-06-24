import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { firebaseConfig } from 'api_keys';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MenuComponent } from './menu/menu.component';
import { AddCategoryComponent } from './dashboard/add-category/add-category.component';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    DashboardComponent,
    PartyDetailComponent,
    OrderDetailComponent,
    MenuComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
