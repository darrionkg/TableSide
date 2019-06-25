import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { mapTo, combineAll, count, map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  constructor(private database: AngularFirestore) {}

  //Parties
  addParty()
  addParty(table: number)
  addParty(table: number, seats: number)
  addParty(table?: number, seats?: number) {
    if(seats === null) {
      seats = 0;
    }
    if (!table) { table = 0 }
    let data = {
      table: table,
      seats: seats
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

  addSeat(partyId) {
    let data;
    let sub = this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').doc(partyId).valueChanges().subscribe(ref => 
      {data = ref;
      data.seats += 1;
      this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').doc(partyId).update(data);
      sub.unsubscribe();
    });
  }

  getParty(partyId) {
    return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').doc(partyId).valueChanges();
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


  //Orders
  addOrder(partyId: string) {
    let data = {
      partyId: partyId
    }
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders').add(data);
  }

  addOrderItem(orderId: string, Item: {}) {
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders')
    .doc(orderId).collection('Items').add(Item);
  }

  getOrders(): Observable<any>
  getOrders(partyId: string): Observable<any>
  getOrders(partyId?: string): Observable<any> {
    if (!partyId || partyId === "All") {
      return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('Orders').valueChanges()      
    } else {

      return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr')
      .collection('Orders', ref => ref.where('partyId', '==', partyId)).snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          let data: Object = a.payload.doc.data();
          let id = a.payload.doc.id;
          return { id, ...data};
        })
      }));         
    }
  }

  getOrderItems(orderId: string): Observable<any> {    
    return this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('Orders').doc(orderId).collection('Items').valueChanges()
  }





  //Categories
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

  updateCategories(newArray: string[]) {    
    this.database.collection('Location').doc('aeMFrRDSm3HJvnb2pBrr').collection('MenuCategories').doc('Categories').set({
      Names: newArray
    })        
  }
}