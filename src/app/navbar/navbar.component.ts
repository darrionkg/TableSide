import { Component, OnInit } from '@angular/core';
import { NavUpdateService } from './nav-update.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen: boolean = false;
  headingString: string = '';
  headingLink: string = '';
  titleString: string = '';
  titleLink: string = '';
  constructor(private nav: NavUpdateService) {
    nav.liveUpdate().subscribe( ref => {      
      this.titleString = ref['titleString'];
      this.titleLink = ref['titleLink'];
      this.headingString = ref['headingString'];
      this.headingLink = ref['headingLink'];      
    })
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
}
