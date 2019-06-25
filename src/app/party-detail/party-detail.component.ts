import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Observable } from 'rxjs';

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
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.partyId = this.route.snapshot.paramMap.get('partyId');
    this.getSeatNum();
    this.getAllOrders();
    
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  addSeat() {
    this.dataService.addOrder(this.partyId);
  }

  getSeatNum() {
    this.dataService.getParty(this.partyId).subscribe(party => this.seats = party); 
  }

  addPartyIdToOrder() {
    this.dataService.addOrder(this.partyId);
  }

  getAllOrders() {
    this.dataService.getOrders(this.partyId).subscribe(order => this.orders = order);
  }

  goToOrderDetails(id) {

    this.router.navigate(['parties/' + this.partyId+ '/orders/' + id]);
  }
}
