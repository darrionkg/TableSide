import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [

  { path: '', component: ClientComponent},
  { path: 'parties', component: ClientComponent},
  { path: 'parties/:partyId', component: PartyDetailComponent },
  { path: 'parties/:partyId/orders/:orderId', component: OrderDetailComponent},
  { path: 'parties/:partyId/orders/:orderId/menu', component: MenuComponent },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) },
  { path: 'menu', component: MenuComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
