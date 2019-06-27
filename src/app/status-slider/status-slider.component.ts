import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { DataService } from 'src/services/data.service';
import { Router } from '@angular/router';
import { PartyDetailComponent } from '../party-detail/party-detail.component';

@Component({
  selector: 'app-status-slider',
  templateUrl: './status-slider.component.html',
  styleUrls: ['./status-slider.component.css']
})
export class StatusSliderComponent implements OnInit {
  @Input() order;
  @Input() partyId;
  itemsStaged = [];
  itemsSent = [];
  itemsExpo = [];
  orderId;
  constructor(private dataService: DataService, private router: Router) { }
  
  ngOnInit() {
    this.dataService.getOrderItems(this.order.id).subscribe(item => {
      this.itemsStaged = item.filter(ref => ref.status === 'staged');
      this.itemsSent = item.filter(ref => ref.status === 'sent');
      this.itemsExpo = item.filter(ref => ref.status === 'expo');
    });
    this.orderId = this.order.id;
    console.log(this.orderId);
    
  }

  goToOrderDetails(id) {
    this.router.navigate(['parties/' + this.partyId+ '/orders/' + id + '/menu']);
  }

  updateStatus(itemId, status) {
    console.log(itemId);
    
    
    // this.dataService.updateItemStatus(orderId, itemId, status);
  }
}