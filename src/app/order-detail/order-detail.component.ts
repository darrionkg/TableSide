import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatIconModule} from '@angular/material/icon';
import { NavUpdateService } from '../navbar/nav-update.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent {
  allItems: Observable<any>;
  constructor(private dataService: DataService, private route: ActivatedRoute, private nav: NavUpdateService) { 
    let orderId = this.route.snapshot.paramMap.get('orderId');
    this.dataService.getOrderItems(orderId).subscribe( ref => {
      this.allItems = ref;            
    })
    this.dataService.getOrder(orderId).subscribe(ref => {
      console.log(ref);
      let table: string = '';
      if (ref.table === 0) {
        table = `Party: ${ref.partyId.slice(0, 3)}`
      } else {
        table = `Table: ${ref.table}`
      }
      console.log(`parties/${ref.partyId}`);
      
      this.nav.updateHeading(table, `parties/${ref.partyId}`, `Seat ${ref.seatId}`, '');
    });
  }

  idToColor(str:string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash}, 90%, 30%)`    
  }  
  
}
