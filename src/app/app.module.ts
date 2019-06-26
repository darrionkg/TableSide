import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { CatFilter } from './catFilter.pipe';
import { MenuEditComponent } from './dashboard/menu-edit/menu-edit.component';

import {MatButtonModule} from '@angular/material/button';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MenuModalComponent } from './menu-modal/menu-modal.component';
import { StatusBarComponent } from './status-bar/status-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    DashboardComponent,
    PartyDetailComponent,
    OrderDetailComponent,
    MenuComponent,
    AddCategoryComponent,
    CatFilter,
    MenuEditComponent,
    NavbarComponent,
    MenuModalComponent,
    StatusBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DashboardRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    MatButtonModule,
    DragDropModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [CatFilter],
  bootstrap: [AppComponent]
})
export class AppModule { }


//party 
//Nothing done salmon

//Change status in data service

//Menu- redirect on stage

//swipe on menu change cat


//parties status effects
//scrollabe div patries window
//make dropdown for order page
//add table when making new party

//order
//Staged  yellow
//Sent    blue
//Expo  green