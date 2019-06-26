import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import { MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private db: DataService, private activeRoute: ActivatedRoute) {
    this.db.getMenuItems().subscribe(item => this.allItems = item);
    this.menuCategories = this.db.getMenuCatagories();
    this.menuCategories.subscribe(item => this.categoryArray = item.Names);
  }

  // http://localhost:4200/parties/7xgfzI5M0yO7ATPf5Q0k/orders/JbL2CHFZM0HeGeMNZVlh/menu
  stageItem(item) {
    const orderId = this.activeRoute.snapshot.paramMap.get('orderId');
    this.db.addOrderItem(orderId, item);
    console.log(orderId);
  }

  showIngredients(item) {
    console.log(item);
    this.modalItem = item.ingredients;
    const modal = document.getElementById('menu-modal');
    modal.style.display = 'block';
  }

  selectCategory(cat) {
    this.selectedCategory = cat.toLowerCase();
  }

  isActiveCat(cat) {
    if (cat.toLowerCase() === this.selectedCategory) {
      return 'activeCat';
    }
  }

  ngOnInit() {
  }

}
