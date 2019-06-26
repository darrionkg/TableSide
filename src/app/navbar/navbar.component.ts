import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleMenu(value) {
    if (value === undefined) {
      this.menuOpen = !this.menuOpen;
    } else {
      this.menuOpen = value;
    }
    if (this.menuOpen) {
      document.getElementById("mySidenav").style.height = "400px";
    } else {
      document.getElementById("mySidenav").style.height = "0"; 
    }
  }
}
