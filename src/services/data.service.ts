import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { mapTo, combineAll, count, map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';

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

  addParty()
  addParty(table: number)
  addParty(table?: number) {
    if (!table) { table = 0 }
    let data = {
      table: table
    }
    return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').add(data);
  }

  getParties() {
    //return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').snapshotChanges();
    return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').snapshotChanges()
    .pipe(map((ref) => {
      return ref.map(a => {
        let data: Object = a.payload.doc.data();
        let id = a.payload.doc.id;
        return { id, ...data};
      })
    }));    

  }

  getMenuCatagories() {
    return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').valueChanges();
  }

  getMenuItems(): Observable<any>
  getMenuItems(categories: string): Observable<any>
  getMenuItems(categories?: string) : Observable<any> {    
    if (!categories || categories === "All") {
      return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Menu').valueChanges();
      
    } else {
      return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr')
      .collection('Menu', ref => ref.where('category', '==', categories)).valueChanges()
    }
  }

  addOrder(partyId: string) {
    let data = {
      partyId: partyId
    }
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders').add(data);
  }

  addOrderItem(OrderId: string, Item: {}) {
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders')
    .doc(OrderId).collection('Items').add(Item);
  }

  deleteCategory(name) {
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').get().subscribe(ref => {
      let categories = ref.data();
      let newArray = [];
      for (let i = 0; i < categories['Names'].length; i++) {
        const element = categories['Names'][i];
        if (element != name) {
          newArray.push(element);
        }
      }
      this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').set({
        Names: newArray
      })
    })
  }

  addCategory(name) {    
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').get().subscribe(ref => {
      let categories = ref.data();      
      
      let newArray = categories['Names'].slice();
      newArray.push(name);
      this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').set({
        Names: newArray
      })
    })
  }
}

export class Location {
  Menu: Observable<any>;
  Orders: Observable<any>;
  Parties: Observable<any>;
}