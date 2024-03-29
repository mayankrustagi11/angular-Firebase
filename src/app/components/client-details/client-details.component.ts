import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;

  constructor(public clientService:ClientService, public router:Router, public route:ActivatedRoute, public flashMessagesService:FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      client.data().id = this.id;
      if(client.data().balance > 0) {
        this.hasBalance = true;
      }
      this.client = client.data();
    });
  }

  updateBalance(id:string) {
    this.showBalanceUpdateInput = false;
    this.clientService.updateClient(id, this.client);
    this.flashMessagesService.show('Balance Updated!', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick() {
    if(confirm("Are you sure to delete?")) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
