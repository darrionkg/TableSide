import { Component, OnInit, Input } from '@angular/core';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-status-slider',
  templateUrl: './status-slider.component.html',
  styleUrls: ['./status-slider.component.css']
})
export class StatusSliderComponent implements OnInit {
@Input() order;
  
  itemsStaged = [];
  itemsSent = [];
  itemsExpo = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getOrderItems(this.order.id).subscribe(item => {
      this.itemsStaged = item.filter(ref => ref.status === 'staged');
      this.itemsSent = item.filter(ref => ref.status === 'sent');
      this.itemsExpo = item.filter(ref => ref.status === 'expo');      
    });
  }
}

// {
//   if (item.status === 'staged') {
//     this.itemsStaged.push(item);
//   }
//   if (item.status === 'sent') {
//     this.itemsSent.push(item);
//   } else {
//     this.itemsExpo.push(item);
//   }
// }