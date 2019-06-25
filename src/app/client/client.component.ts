import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  parties: any[] = [];
  constructor(private dataService: DataService) {

    dataService.getParties().subscribe( ref => this.parties = ref);
   }
  
   addParty() {
     this.dataService.addParty().then(ref => console.log(ref.id));
   }

  ngOnInit() {

  }
  myFunction() {
    var x: HTMLElement = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += 'responsive';
    } else {
      x.className = 'topnav';
    }
  }
}

