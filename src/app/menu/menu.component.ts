import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allItems: [] = [];
  menuCategories: any;
  categoryArray;
  selectedCategory = 'drink';
  modalItem;

  constructor(private db: DataService) {
    this.db.getMenuItems().subscribe(item => this.allItems = item);
    this.menuCategories = this.db.getMenuCatagories();
    this.menuCategories.subscribe(item => this.categoryArray = item.Names);
  }

  stageItem(item) {
    this.db.addOrderItem('testOrder', item);
    console.log(item);
  }

  showIngredients(item) {
    console.log(item);
    this.modalItem = item.ingredients;
    const modal = document.getElementById('menu-modal');
    modal.style.display = 'block';
  }

  closeModal() {
    console.log('something');
    
  }

  selectCategory(cat) {
    this.selectedCategory = cat.toLowerCase();
    console.log(cat);
  }

  isActiveCat(cat) {
    if (cat.toLowerCase() === this.selectedCategory) {
      return 'activeCat';
    }
  }

  ngOnInit() {
  }

}
