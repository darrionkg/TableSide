import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { mapTo, combineAll, count, map } from 'rxjs/operators';
import { Observable, merge } from 'rxjs';
import { FirebaseDatabase } from '@angular/fire';
import { firestore } from 'firebase';

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

  // Parties
  addParty();
  addParty(table: number);
  addParty(table: number, seats: number);
  addParty(table?: number, seats?: number) {
    if (!seats) {
      seats = 1;
    }
    if (!table) { table = 0; }
    const data = {
      table,
      seats,
      timeSeated: firestore.FieldValue.serverTimestamp(),
      status: 'new'
    };
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').add(data);
  }

  getParties() {
    // return this.database.collection('l').doc('aeMFrRDSm3HJvnb2pBrr').collection('Parties').snapshotChanges();
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));

  }

  // addSeat(partyId) {
  //   let sub = this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).get().subscribe(ref => {
  //     let data;
  //     data = ref;
  //     data.seats += 1;
  //     data.status = 'greeted';
  //     // this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).update(data);
  //     this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).set(data);
  //     sub.unsubscribe();
  //   });
  // }

  getParty(partyId) {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).valueChanges();
  }

  getMenuCatagories() {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').valueChanges();
  }

  getMenuItems(): Observable<any>;
  getMenuItems(categories: string): Observable<any>;
  getMenuItems(categories?: string): Observable<any> {
    if (!categories || categories === 'All') {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menu').snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      }));
    } else {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
        .collection('menu', ref => ref.where('category', '==', categories)).snapshotChanges()
        .pipe(map((ref) => {
          return ref.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data};
          });
        }));
    }
  }

  // Orders
  addOrder(partyId: string, seatId: number, table: number) {
    const data = {
      partyId,
      seatId,
      table
    };
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders').add(data);
// tslint:disable-next-line: max-line-length
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('parties').doc(partyId).update({seats: seatId + 1, status: 'greeted'});
  }

  addOrderItem(orderId: string, Item: {}) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders')
    .doc(orderId).collection('items').add(Item);
  }

  getOrders(): Observable<any>;
  getOrders(partyId: string): Observable<any>;
  getOrders(partyId?: string): Observable<any> {
    if (!partyId || partyId === 'All') {
      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('orders').valueChanges();
    } else {

      return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
      .collection('orders', ref => ref.where('partyId', '==', partyId)).snapshotChanges()
      .pipe(map((ref) => {
        return ref.map(a => {
          const data: Object = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
        });
      }));
    }
  }

  getOrderItems(orderId: string): Observable<any> {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('orders').doc(orderId).collection('items').valueChanges();
  }

  getOrder(orderId: string): Observable<any> {
    return this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('orders').doc(orderId).valueChanges();
  }

  updateOrderStatus(partyId: string, status: string) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('orders', ref => ref.where('partyId', '==', partyId)).get().subscribe( ref => {
      ref.forEach(e => {
        this.database.doc(e.ref).collection('items').get().subscribe( itemList => {
          itemList.forEach(item => {
            this.database.doc(item.ref).update({status: status});
          });
        });
      });
    });
  }

  // Categories
  deleteCategory(name) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').get().subscribe(ref => {
      const categories = ref.data();
      const newArray = [];
      for (let i = 0; i < categories.names.length; i++) {
        const element = categories.names[i];
        if (element != name) {
          newArray.push(element);
        }
      }
      this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
        names: newArray
      });
    });
  }

  addCategory(name) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').get().subscribe(ref => {
      const categories = ref.data();

      const newArray = categories.names.slice();
      newArray.push(name);
      this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
        names: newArray
      });
    });
  }

  updateCategories(newArray: string[]) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menuCategories').doc('categories').set({
      Names: newArray
    });
  }
  // Add and Delete from Menu
  addToMenu(category, ingredientString: string, name, price) {
    let ingredientArray: string[] = [];
    if (!ingredientString.includes(' ')) {
      ingredientArray = [ingredientString];
    } else {
      ingredientArray = ingredientString.split(' ');
    }
    const data = {
      category,
      ingredients: ingredientArray,
      name,
      price,
      status: 'staged'
    };
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr').collection('menu').add(data);
  }

  deleteFromMenu(itemId: string) {
    this.database.collection('location').doc('aeMFrRDSm3HJvnb2pBrr')
    .collection('menu').doc(itemId).delete();
  }
}
