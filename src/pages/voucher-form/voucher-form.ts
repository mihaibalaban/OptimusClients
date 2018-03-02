import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CentralBrainProvider } from '../../providers/central-brain/central-brain';
@Component({
    selector: 'voucher-form',
    templateUrl: 'voucher-form.html'
})
export class VoucherFormPage {
    private voucherForm: FormGroup;
    voucher;

    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public dataService: CentralBrainProvider
    ) {
        this.voucher = navParams.get('voucher');
        this.voucherForm = this.formBuilder.group({
            price: [''],
            route: [''],
            date: [''],
            baf: [''],
            invoice: [''],
            reference: [''],
            truck: [''],
            truck_length: [''],
        });

        if(this.voucher.date != null){
            this.voucherForm.controls['price'].setValue(this.voucher.price);
            this.voucherForm.controls['route'].setValue( this.voucher.route);
            this.voucherForm.controls['date'].setValue( this.voucher.date);
            this.voucherForm.controls['baf'].setValue( this.voucher.baf);            
            this.voucherForm.controls['invoice'].setValue( this.voucher.invoice);
            this.voucherForm.controls['reference'].setValue( this.voucher.reference);
            this.voucherForm.controls['truck'].setValue( this.voucher.truck);
            this.voucherForm.controls['truck_length'].setValue( this.voucher.truck_length);   
        }
    }

    submit() {
        this.voucherForm.value.voucher_id = this.voucher.id;
        this.dataService.updateVoucher(this.voucherForm.value).then(data => {
            console.log(data);
            this.presentToast();
            this.navCtrl.pop();
        })
    }

    presentToast() {
        let message;
        if(this.voucher.date != null){
            message = "Voucher modificat"
        }else{
            message = "Voucher utilizat cu succes"
        }
        let toast = this.toastCtrl.create({
          message: message,
          duration: 2000
        });
        toast.present();
      }

}