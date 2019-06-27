import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client/client.component';
import { PartyDetailComponent } from './party-detail/party-detail.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MenuComponent } from './menu/menu.component';
import { CookTicketComponent } from './cook-ticket/cook-ticket.component';


const routes: Routes = [

  { path: '', component: ClientComponent},
  { path: 'parties', component: ClientComponent},
  { path: 'parties/:partyId', component: PartyDetailComponent },
  { path: 'parties/:partyId/orders/:orderId/menu', component: MenuComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kitchen', component: CookTicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
