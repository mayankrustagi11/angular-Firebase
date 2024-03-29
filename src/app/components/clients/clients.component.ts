import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:any[];
  totalOwed:number;

  constructor(public clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => {
      this.clients = clients;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    let total = 0;
    for(let i=0;i<this.clients.length;i++) {
      total += parseFloat(this.clients[i].balance);
    }
    this.totalOwed = total;
  }

}
