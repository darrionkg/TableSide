import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './../../services/data.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavUpdateService } from '../navbar/nav-update.service';

// import { Location } from '@angular/common';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  parties: any[] = [];
  updateTimer;
  modalItem;
  tableToUpdate;
  constructor(private dataService: DataService, private db: AngularFirestore, private router: Router, private nav: NavUpdateService) {
    dataService.getParties().subscribe(ref => {
      this.parties = ref.sort((a, b) => {
        if (a.hasOwnProperty('timeSeated') && a['timeSeated'] != null &&
          b.hasOwnProperty('timeSeated') && b['timeSeated'] != null) {
          return b['timeSeated']['seconds'] - a['timeSeated']['seconds'];
        } else {
          return 0;
        }
      });
      nav.updateHeading('', `${ref.length}`, 'Table Side', '');
      this.updateWaitTime();
    });
  }
  updateWaitTime() {
    if (this.parties && this.parties.length > 0) {
      for (let i = 0; i < this.parties.length; i++) {
        this.parties[i].waitTime =
          Math.floor((Date.now() * .001 - this.parties[i]['timeSeated']['seconds']) / 60)
      }
    }
  }

  ngOnInit() {
    this.updateTimer = setInterval(ref => {
      this.updateWaitTime();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.updateTimer);
  }

  addParty() {
    this.dataService.addParty().then(ref => console.log(ref.id));
  }

  goToPartyPage(party) {
    this.router.navigate(['parties', party.id]);
  }

  idToColor(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash}, 90%, 30%)`
  }

  assignTable(table) {
    this.modalItem = this.parties;
    this.tableToUpdate = table;
    const modal = document.getElementById('table-modal');
    modal.style.display = 'flex';
    console.log(table)
  }
}
