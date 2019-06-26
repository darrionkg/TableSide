import { Component, OnInit } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

// import { Location } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  parties: any[] = [];
  constructor(private dataService: DataService, private db: AngularFirestore, private router: Router) {
    dataService.getParties().subscribe(ref => this.parties = ref);
  }

  addParty() {
    this.dataService.addParty().then(ref => console.log(ref.id));
  }

  goToPartyPage(party) {
    this.router.navigate(['parties', party.id]);
  }

  idToColor(str:string) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash}, 90%, 30%)`    
  }  
}
