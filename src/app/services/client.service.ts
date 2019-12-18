import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: Observable<any[]>;
  client: Observable<any>;

  constructor(public db:AngularFirestore) { 
    this.clients = this.db.collection('clients').valueChanges();
  }

  getClients() {
    return this.clients;
  }
}
