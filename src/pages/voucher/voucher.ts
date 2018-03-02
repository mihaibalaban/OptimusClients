import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CentralBrainProvider } from '../../providers/central-brain/central-brain';
import { VoucherFormPage } from '../voucher-form/voucher-form';

@Component({
    selector: 'voucher',
    templateUrl: 'voucher.html'
})
export class VoucherPage {
    private voucherForm: FormGroup;
    clients;
    voucher;
    showForm: boolean = false;
    vouchers;

    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public dataService: CentralBrainProvider
    ) {

    }

    generateVoucher() {
        this.dataService.generateVoucher().then(data => {
            this.vouchers = [];
            this.voucher = data;
            console.log(this.voucher);
        })
    }

    voucherTapped(voucher) {
        this.navCtrl.push(VoucherFormPage,{
            voucher: voucher
        })
    }

    submit() {
        this.voucherForm.value.voucher_id = this.voucher.id;
        this.dataService.updateVoucher(this.voucherForm.value).then(data => {
            console.log(data);
        })
    }

    getAllVouchers() {
        this.dataService.getAllVouchers().then(data => {
            this.vouchers = data;
            console.log(this.vouchers)
        })
    }

}