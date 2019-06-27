import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Observable } from 'rxjs';
import { NavUpdateService } from '../navbar/nav-update.service';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  partyId: string;
  seats;
  seatsArray;
  orders: Observable<any>;

  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService, private nav: NavUpdateService) {}

  ngOnInit() {
    this.partyId = this.route.snapshot.paramMap.get('partyId');
    this.getSeatNum();
    this.getAllOrders();
    this.nav.updateHeading(this.partyId.slice(0, 3), '', 'Home', '');
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  addSeat() {
    if (this.seats) {
      this.dataService.addOrder(this.partyId, this.seats.seats, 0);
    }
  }

  getSeatNum() {
    this.dataService.getParty(this.partyId).subscribe(party => this.seats = party);
  }

  // addPartyIdToOrder() {
  //   this.dataService.addOrder(this.partyId);
  // }

  getAllOrders() {
    this.dataService.getOrders(this.partyId).subscribe(order => {
      this.orders = order.sort((a, b) => {
        return a.seatId - b.seatId;
      })
    });
  }

  goToOrderDetails(id) {
    this.router.navigate(['parties/' + this.partyId+ '/orders/' + id + '/menu']);
  }

  sendOrders(status) {
    this.dataService.updateOrderStatus(this.partyId, status)
  }

}
