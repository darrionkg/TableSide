import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.css']
})
export class MenuEditComponent implements DoCheck {
  menuItems: {} = {};
  selectedCategory: string;
  
  constructor(private router: Router, private route: ActivatedRoute, private db: DataService) {
    this.db.getMenuItems().subscribe(ref => {
      this.menuItems = ref;
    })
  }

  ngDoCheck() {
    this.selectedCategory = this.route.snapshot.paramMap.get('category').toLowerCase();
  }

  addToMenu(ingredientString, name, price) {
    this.db.addToMenu(this.selectedCategory, ingredientString, name, price);
  }  
}