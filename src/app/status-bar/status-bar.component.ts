import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {
@Input() order: any;

  items: any[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getOrderItems(this.order.id).subscribe(item => this.items = item);
  }

}
