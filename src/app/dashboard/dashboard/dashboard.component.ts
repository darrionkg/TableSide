import { Component, OnInit} from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  categories: {} = {};
  counts = 0;
  menuOpen: boolean;
  constructor(database: DataService) {
    database.getMenuCatagories().subscribe(ref => {
      this.categories = ref;
    });
  }
  toggleMenu(value) {
    if (value === undefined) {
      this.menuOpen = !this.menuOpen;
    } else {
      this.menuOpen = value;
    }
    if (this.menuOpen) {
      document.getElementById('adminSidenav').style.width = '50%';
    } else {
      document.getElementById('adminSidenav').style.width = '0';
    }
  }

}
