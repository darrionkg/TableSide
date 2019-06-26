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
export class OrderDetailComponent implements OnInit {
  allItems: Observable<any>;
  constructor(private dataService: DataService, private route: ActivatedRoute, private nav: NavUpdateService) { }

  ngOnInit() {
    let orderId = this.route.snapshot.paramMap.get('orderId');
    this.allItems = this.dataService.getOrderItems(orderId);
    this.nav.updateHeading('Seat 1', '', 'Table 2', '');
  }

}
