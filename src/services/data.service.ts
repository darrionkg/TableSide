import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { mapTo, combineAll, count, map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  DataStream;

  constructor(private database: AngularFirestore) {
    this.DataStream = new Observable( observer => {

    });
  }

  getData(location: string) {

  }

  //Parties
  addParty()
  addParty(table: number)
  addParty(table: number, seats: number)
  addParty(table?: number, seats?: number) {
    if(!seats) {
      seats = 1;
    }
    if (!table) { table = 0 }
    let data = {
      table: table,
      seats: seats
    }    
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').add(data);
  }

  getParties() {
    //return this.database.collection('l').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').snapshotChanges();
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          let data: Object = a.payload.doc.data();
          let id = a.payload.doc.id;
          return { id, ...data };
        })
      }));

  }

  addSeat(partyId) {
    let data;
    let sub = this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).valueChanges().subscribe(ref => 
      {data = ref;
      data.seats += 1;
      this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).update(data);
      sub.unsubscribe();
    });
  }

  getParty(partyId) {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).valueChanges();
  }

  getMenuCatagories() {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').valueChanges();
  }

  getMenuItems(): Observable<any>
  getMenuItems(categories: string): Observable<any>
  getMenuItems(categories?: string): Observable<any> {
    if (!categories || categories === "All") {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menu').valueChanges();

    } else {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
        .collection('menu', ref => ref.where('category', '==', categories)).valueChanges()
    }
  }

  //Orders
  addOrder(partyId: string) {
    let data = {
      partyId: partyId
    }
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders').add(data);
  }

  addOrderItem(orderId: string, Item: {}) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders')
    .doc(orderId).collection('items').add(Item);
  }

  getOrders(): Observable<any>
  getOrders(partyId: string): Observable<any>
  getOrders(partyId?: string): Observable<any> {
    if (!partyId || partyId === "All") {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders').valueChanges();
    } else {

      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
      .collection('orders', ref => ref.where('partyId', '==', partyId)).snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          let data: Object = a.payload.doc.data();
          let id = a.payload.doc.id;
          return { id, ...data};
        });
      }));
    }
  }

  getOrderItems(orderId: string): Observable<any> {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('orders').doc(orderId).collection('items').valueChanges()
  }





  //Categories
  deleteCategory(name) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').get().subscribe(ref => {
      let categories = ref.data();
      let newArray = [];
      for (let i = 0; i < categories['names'].length; i++) {
        const element = categories['names'][i];
        if (element != name) {
          newArray.push(element);
        }
      }
      this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
        names: newArray
      })
    })
  }

  addCategory(name) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').get().subscribe(ref => {
      let categories = ref.data();

      let newArray = categories['names'].slice();
      newArray.push(name);
      this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
        names: newArray
      })
    })
  }

  updateCategories(newArray: string[]) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
      Names: newArray
    })
  }
  //Add and Delete from Menu
  addToMenu(category, ingredientString: string, name, price) {
    let ingredientArray: string[] = [];
    if (!ingredientString.includes(' ')) {
      ingredientArray = [ingredientString];
    } else {
      ingredientArray = ingredientString.split(" ")
    }
    let data = {
      category: category,
      ingredients: ingredientArray,
      name: name,
      price: price
    }
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menu').add(data);
  }
}
