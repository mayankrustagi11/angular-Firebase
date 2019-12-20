import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/Client';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  clientDoc: AngularFirestoreDocument<Client>;

  constructor(public afs:AngularFirestore) { 

    this.clientsCollection = this.afs.collection<Client>('clients', ref => ref.orderBy('firstName', 'asc'));
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Client;
        data.key = a.payload.doc.id;
        return data;
      });
    }));
  }

  getClients() {
    return this.clients;
  }

  newClient(client:Client) {
    this.clientsCollection.add(client);
  }

  getClient(id:string) {
    return this.afs.collection<Client>('clients').doc(id).get()

  }

  updateClient(id:string, client:Client) {
    return this.afs.doc(`clients/${id}`).update(client);
  }

  deleteClient(id:string) {
    return this.afs.doc(`clients/${id}`).delete();
  }
}
