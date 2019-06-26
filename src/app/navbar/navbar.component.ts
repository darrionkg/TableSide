import { Component, OnInit } from '@angular/core';
import { NavUpdateService } from './nav-update.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen: boolean = false;
  constructor(private nav: NavUpdateService) {
    //nav.heading
  }

  toggleMenu(value) {
    if (value === undefined) {
      this.menuOpen = !this.menuOpen;
    } else {
      this.menuOpen = value;
    }
    if (this.menuOpen) {
      document.getElementById("mySidenav").style.height = "100%";
    } else {
      document.getElementById("mySidenav").style.height = "0"; 
    }
  }

  updateHeading(event) {
    console.log(event);    
  }


}
