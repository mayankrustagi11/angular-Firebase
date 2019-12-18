import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientsCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;

  constructor(public afs:AngularFirestore) { 
    this.clientsCollection = afs.collection<Client>('clients');
    this.clients = this.clientsCollection.valueChanges();
  }

  getClients() {
    return this.clients;
  }

  newClient(client:Client) {
    this.clientsCollection.add(client);
  }

  getClient(id:string) {
    this.clientsCollection = this.afs.collection<Client>('clients', ref => ref.where('key', '==', id));
    this.clients = this.clientsCollection.valueChanges();
    return this.clients;
  }

  updateClient(id:string, client:Client) {
    return this.afs.collection<Client>('clients').doc(id).set(client, {merge:true});
  }

  deleteClient(id:string) {
    return this.afs.collection<Client>('clients').doc(id).delete();
  }
}
