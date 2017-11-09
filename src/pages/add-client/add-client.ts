import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-add-client',
    templateUrl: 'add-client.html'
})
export class AddClientPage {
    private addClientForm: FormGroup;
    clients;
    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, db: AngularFireDatabase) {
        this.clients = db.list('/clients');
        this.addClientForm = this.formBuilder.group({
            BILET_LA_ORDIN: [''],
            CONTRACT: [''],
            MONEDA: [''],
            OBSERVATII: [''],
            PARTENER: [''],
            PRET: [''],
            STATUS: [''],
            TERMEN_PL: [''],
        });

    }

    addClient() {
        console.log(this.addClientForm.value)
        this.clients.push({
            BILET_LA_ORDIN: this.addClientForm.value.BILET_LA_ORDIN ,
            CONTRACT: this.addClientForm.value.CONTRACT ,
            MONEDA: this.addClientForm.value.MONEDA ,
            OBSERVATII: this.addClientForm.value.OBSERVATII ,
            PARTENER:this.addClientForm.value.PARTENER ,
            PRET: this.addClientForm.value.PRET ,
            STATUS: this.addClientForm.value.STATUS ,
            TERMEN_PL: this.addClientForm.value.TERMEN_PL ,
        })
        this.navCtrl.push(HomePage)
        this.presentToast()
    }

    presentToast() {
        let toast = this.toastCtrl.create({
          message: 'Client adaugat',
          duration: 3000
        });
        toast.present();
      }

}
