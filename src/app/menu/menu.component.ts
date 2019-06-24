import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import { all } from 'q';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allItems: [] = [];
  constructor(private db: DataService) { 
    this.db.getMenuItems().subscribe(item => this.allItems = item);
  }

  // addItem will take menu item information, and send it to the service with an order # via route
  addItem(item) {
    this.db.addOrderItem("testOrder", item);
  }


  ngOnInit() {
  }

}
