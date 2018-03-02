import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { AlertController, ActionSheetController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-partner',
  templateUrl: 'partner.html'
})
export class PartnerPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;
  public keyClient;
  client: FirebaseObjectObservable<any[]>;
  clientArray;
  moneda;
  status;
  partener;
  TERMEN_PL;
  CONTRACT;
  OBSERVATII;
  BILET_LA_ORDIN;
  PRET;

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, db: AngularFireDatabase) {
    this.keyClient = navParams.get("keyClient");
    this.client = db.object('/clients/' + this.keyClient);
    this.client.subscribe(data => {
      this.clientArray = data;
      console.log(this.clientArray)
      this.moneda = this.clientArray.MONEDA;
      this.status = this.clientArray.STATUS;
      this.partener = this.clientArray.PARTENER;
      this.TERMEN_PL = this.clientArray.TERMEN_PL;
      this.CONTRACT = this.clientArray.CONTRACT;
      this.OBSERVATII = this.clientArray.OBSERVATII;
      this.BILET_LA_ORDIN = this.clientArray.BILET_LA_ORDIN;
      this.PRET = this.clientArray.PRET;
      
    })
  }

  showOptions() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Optiuni',
      buttons: [
        {
          text: 'Update',
          handler: () => {
            this.update();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  update() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Update the name for this song",
      inputs: [
        {
          name: 'Partener',
          placeholder: 'Partener',
          value: this.partener
        },
        {
          name: 'STATUS',
          placeholder: 'STATUS',
          value: this.status
        },
        {
          name: 'MONEDA',
          placeholder: 'MONEDA',
          value: this.moneda
        },
        {
          name: 'TERMEN_PL',
          placeholder: 'TERMEN_PL',
          value: this.TERMEN_PL
        },
        {
          name: 'CONTRACT',
          placeholder: 'CONTRACT',
          value: this.CONTRACT
        },
        {
          name: 'BILET_LA_ORDIN',
          placeholder: 'BILET_LA_ORDIN',
          value: this.BILET_LA_ORDIN
        },
        {
          name: 'PRET',
          placeholder: 'PRET',
          value: this.PRET
        },
        {
          name: 'OBSERVATII',
          placeholder: 'OBSERVATII',
          value: this.OBSERVATII
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log(data)
            this.client.update({
              PARTENER: data.Partener,
              MONEDA: data.MONEDA,
              TERMEN_PL: data.TERMEN_PL,
              STATUS: data.STATUS,
              OBSERVATII: data.OBSERVATII,
              PRET: data.PRET,
              CONTRACT: data.CONTRACT,
              BILET_LA_ORDIN: data.BILET_LA_ORDIN,
            }).then(()=>{
              this.navCtrl.setRoot(HomePage);
              this.presentToast()
            }).catch(()=>{
              this.presentToastError()
              
            });

          }
        }
      ]
    });
    prompt.present();
  }

  presentToastError() {
    let toast = this.toastCtrl.create({
      message: 'Nu a mers. Suna-l pe Mihai!!!',
      duration: 3000
    });
    toast.present();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Update efectuat',
      duration: 3000
    });
    toast.present();
  }

}
