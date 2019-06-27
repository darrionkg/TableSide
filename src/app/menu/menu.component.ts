import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import { Observable } from 'rxjs';
import { MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { NavUpdateService } from '../navbar/nav-update.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  allItems: [] = [];
  menuCategories: any;
  categoryArray = [];
  selectedCategory = 0;
  modalItem;
  stagedArray: any[] = [];
  notMenu = true;
  partyId: string;

  constructor(private db: DataService, private activeRoute: ActivatedRoute, private router: Router, private header: NavUpdateService) {
    this.db.getMenuItems().subscribe(item => this.allItems = item);
    this.menuCategories = this.db.getMenuCatagories();
    this.menuCategories.subscribe(item => this.categoryArray = item.Names);

    let partyId = this.activeRoute.snapshot.paramMap.get('partyId');
    if (partyId) { 
      header.updateHeading('home', '', partyId.slice(0, 3), 'parties/' + partyId);
    } else {
      header.updateHeading('home', '', 'Menu', '');
    }
  }

  // http://localhost:4200/parties/7xgfzI5M0yO7ATPf5Q0k/orders/JbL2CHFZM0HeGeMNZVlh/menu
  addStagedItems() {
    const orderId = this.activeRoute.snapshot.paramMap.get('orderId');
    this.stagedArray.forEach(item => this.db.addOrderItem(orderId, item));
    this.stagedArray = [];
    this.returnToParty();
  }

  stageItem(item) {
    console.log(item.id)
    this.stagedArray.push(item);
    console.log(this.stagedArray);
  }

  unStageItem(item) {
    for(let i=0; i < this.stagedArray.length; i++){
      if(this.stagedArray[i].name === item.name) {
        this.stagedArray.splice(i,1);
        break;
      }
    }
  }

  showIngredients(item) {
    console.log(item);
    this.modalItem = item.ingredients;
    const modal = document.getElementById('menu-modal');
    modal.style.display = 'flex';
  }


  checkURL(): void {
    if(this.router.url === '/menu')
      this.notMenu = false;
  }

  returnToParty() {
    this.partyId = this.activeRoute.snapshot.paramMap.get('partyId');
    this.router.navigate(['parties/' + this.partyId])
  }

  ngOnInit() {
    this.checkURL();
  }

  selectCategory(index) {
    this.selectedCategory = index;
  }
  onSwipeRight() {
    this.selectedCategory++;
    if (this.selectedCategory >= this.categoryArray.length) {
      this.selectedCategory = 0;
    }
  }

  onSwipeLeft() {
    this.selectedCategory--;
    if (this.selectedCategory < 0) {
      this.selectedCategory = this.categoryArray.length - 1;
    }
  }

}
