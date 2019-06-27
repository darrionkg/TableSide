import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-cook-ticket',
  templateUrl: './cook-ticket.component.html',
  styleUrls: ['./cook-ticket.component.css']
})
export class CookTicketComponent {
  orders = {};
  constructor(private database: DataService) {
    this.database.getOrders().subscribe(ref => {
      ref.forEach(order => {                
        this.database.getOrderItems(order.id).subscribe(items => {          
          this.orders[order.id] = items.filter(status => {
            return status.status === 'sent';
          });
          if (this.orders[order.id].length === 0) {
            delete this.orders[order.id]
          }
        })
      });               
    });
  }


  expoItem(orderId, itemId) {
    this.database.updateItemStatus(orderId, itemId, 'expo');
    // console.log(orderId, itemId);
    
  }
}
