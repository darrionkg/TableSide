import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  categories: {} = {};
  counts = 0;
  constructor(database: DataService) { 
    database.getMenuCatagories().subscribe(ref => {
      this.categories = ref;      
    })
  }  
  ngOnInit() {
  }

}
