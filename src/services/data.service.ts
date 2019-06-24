import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  static location: Location;
  constructor(private database: AngularFirestore) {
    DataService.location = new Location();
    DataService.location.Menu = database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Menu').valueChanges();
    DataService.location.Orders = database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders').valueChanges();
    DataService.location.Parties = database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').valueChanges();
  }


  addParty() {
    let data = {
      table: 3
    }
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').doc("PArty2").set(data);
  }



  getArticles() {
    return this.database.collection('aeMFrRDSm3HJvnb2pBrr').valueChanges();
  }

}

export class Location {
  Menu: any;
  Orders: any;
  Parties: any;
}