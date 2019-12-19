import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from 'src/app/models/Client';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id:string;
  client:Client = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'key': '',
    'phone': '',
    'balance': 0
  };

  disableBalanceOnEdit:boolean;

  constructor(public clientService:ClientService, public router:Router, public route:ActivatedRoute, public flashMessagesService:FlashMessagesService, public settingsService:SettingsService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client[0];
    });

    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value:Client, valid:boolean}) {

    if(!valid) {
      this.flashMessagesService.show('Please fill in all fields!', {cssClass:'alert-danger', timeout: 4000});
      this.router.navigate(['edi-client/'+this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client Updated!', {cssClass:'alert-success', timeout: 4000});
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
