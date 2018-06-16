import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CentralBrainProvider } from '../../providers/central-brain/central-brain';
import { AlertController } from 'ionic-angular';

@Component({
    selector: 'voucher-form',
    templateUrl: 'voucher-form.html'
})
export class VoucherFormPage {
    private voucherForm: FormGroup;
    voucher;
    isUsed;

    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public dataService: CentralBrainProvider,
        public alertCtrl: AlertController,        
    ) {
        this.voucher = navParams.get('voucher');

        if (this.voucher.date != null) {
            this.isUsed = true        
        }else{
            this.isUsed = false;            
        }

        this.voucherForm = this.formBuilder.group({
            price: [''],
            route: [''],
            date: [''],
            baf: [''],
            invoice: [''],
            reference: [''],
            truck: [''],
            truck_length: [''],
            total: [''],
            goods: [''],
            drivers: [''],
        });

        if (this.voucher.date != null) {
            this.voucherForm.controls['price'].setValue(this.voucher.price);
            this.voucherForm.controls['route'].setValue(this.voucher.route);
            this.voucherForm.controls['date'].setValue(this.voucher.date);
            this.voucherForm.controls['baf'].setValue(this.voucher.baf);
            this.voucherForm.controls['invoice'].setValue(this.voucher.invoice);
            this.voucherForm.controls['reference'].setValue(this.voucher.reference);
            this.voucherForm.controls['truck'].setValue(this.voucher.truck);
            this.voucherForm.controls['truck_length'].setValue(this.voucher.truck_length);
            this.voucherForm.controls['total'].setValue(this.voucher.total);
            this.voucherForm.controls['total'].setValue(this.voucher.goods);
            this.voucherForm.controls['total'].setValue(this.voucher.drivers);
        }
    }

    submit() {
        this.voucherForm.value.voucher_id = this.voucher.id;
        this.dataService.updateVoucher(this.voucherForm.value).then(data => {
            this.presentToast();
            this.navCtrl.pop();
        })
    }

    presentToast() {
        let message;
        if (this.voucher.date != null) {
            message = "Voucher modificat"
        } else {
            message = "Voucher utilizat cu succes"
        }
        let toast = this.toastCtrl.create({
            message: message,
            duration: 4000
        });
        toast.present();
    }


truck_length(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    
    alert.addInput({
        type: 'radio',
        label: '7',
        value: '7',
      });
      alert.addInput({
        type: 'radio',
        label: '9',
        value: '9',
      });
      alert.addInput({
        type: 'radio',
        label: '10',
        value: '10',
      });
      alert.addInput({
        type: 'radio',
        label: '12',
        value: '12',
      });
      alert.addInput({
        type: 'radio',
        label: '17',
        value: '17',
      });
      alert.addInput({
        type: 'radio',
        label: '18',
        value: '18',
      });
      alert.addInput({
        type: 'radio',
        label: '19',
        value: '19',
      });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.voucherForm.controls['truck_length'].setValue(data);
      }
    });
    alert.present();
  }

    
  route(){
    let alert = this.alertCtrl.create();
    alert.setTitle('Lightsaber color');
    
    alert.addInput({
        type: 'radio',
        label: 'CA-DO',
        value: 'CA-DO',
      });
      alert.addInput({
        type: 'radio',
        label: 'DO-CA',
        value: 'DO-CA',
      });
    
    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.voucherForm.controls['route'].setValue(data);
      }
    });
    alert.present();
  }

}