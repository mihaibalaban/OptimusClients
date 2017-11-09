import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CentralBrainProvider } from '../../providers/central-brain/central-brain';
import { PartnerPage } from '../partner/partner'; 


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  clients: FirebaseListObservable<any[]>;
  clientsArray = [];
  completeArray = [];

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase, public dataService: CentralBrainProvider) {
    this.clients = db.list('/clients');
    this.clients.subscribe(data => {
      this.clientsArray = data;
    })
  }

  onInput($event) {
    this.completeArray = this.dataService.filterItems($event.srcElement.value.toUpperCase(), this.clientsArray);
  }

  moveToClient(partnerID) {
    this.navCtrl.push(PartnerPage, {
      keyClient: partnerID,
    })
  }

  

}
