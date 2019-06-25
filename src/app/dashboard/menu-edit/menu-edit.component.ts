import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements OnInit {
  category: {} = {};
  selectedCategory: string;
  constructor(private db: DataService) { 
    //this.selectedCategory = routeSegment.toLowerCase();
    //this.db.getMenuItems().subscribe(item => )
  }

  ngOnInit() {
  }

}
