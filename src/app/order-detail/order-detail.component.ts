import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { NavUpdateService } from '../navbar/nav-update.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  static orderIndex = 0;
  allItems;
  allOrders;
  orderId;
  partyId;
  constructor(private dataService: DataService, private route: ActivatedRoute, private nav: NavUpdateService, private router: Router) {
    OrderDetailComponent.orderIndex = 0;
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    this.partyId = this.route.snapshot.paramMap.get('partyId');
    this.subscribeToOrder();

    router.events.subscribe(ref => {
      if (this.orderId !== this.route.snapshot.paramMap.get('orderId')) {
        this.orderId = this.route.snapshot.paramMap.get('orderId');
        this.partyId = this.route.snapshot.paramMap.get('partyId');
        this.subscribeToOrder();
      }
    });
  }

  subscribeToOrder() {
    this.dataService.getOrderItems(this.orderId).subscribe(ref => {
      this.allItems = ref;
    });
    this.dataService.getOrder(this.orderId).subscribe(ref => {
      let table: string = '';
      if (ref.table === 0) {
        table = `Party: ${ref.partyId.slice(0, 3)}`
      } else {
        table = `Table: ${ref.table}`
      }
      this.nav.updateHeading(table, `parties/${ref.partyId}`, `Seat ${ref.seatId}`, '');
    });
    this.dataService.getOrders(this.partyId).subscribe(order => {
      this.allOrders = order.sort((a, b) => {
        return a.seatId - b.seatId;
      });
    });
  }


  idToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash}, 90%, 30%)`
  }

  onSwipeRight() {
    if (this.allOrders) {
      OrderDetailComponent.orderIndex--;
      if (OrderDetailComponent.orderIndex < 0) {
        OrderDetailComponent.orderIndex = 0;
      }
      this.router.navigate([`../${this.allOrders[OrderDetailComponent.orderIndex].id}`], { relativeTo: this.route });
    }
  }

  onSwipeLeft() {
    if (this.allOrders) {
      OrderDetailComponent.orderIndex++;
      if (OrderDetailComponent.orderIndex >= this.allOrders.length) {
        OrderDetailComponent.orderIndex = this.allOrders.length - 1;
      }
      this.router.navigate([`../${this.allOrders[OrderDetailComponent.orderIndex].id}`], {
        relativeTo: this.route
      });
    }
  }

}
