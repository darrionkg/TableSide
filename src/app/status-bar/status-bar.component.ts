import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.css']
})
export class StatusBarComponent implements OnInit {
  @Input() order: any;
  itemsStaged = [];
  itemsSent = [];
  itemsExpo = [];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getOrderItems(this.order.id).subscribe(item => {
      this.itemsStaged = item.filter(ref => ref.status === 'staged');
      this.itemsSent = item.filter(ref => ref.status === 'sent');
      this.itemsExpo = item.filter(ref => ref.status === 'expo');
    });
  }
}
