import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {  
  allItems: Observable<any>;
  constructor(private dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {
    let orderId = this.route.snapshot.paramMap.get('orderId');
    this.allItems = this.dataService.getOrderItems(orderId);    
  }

}
