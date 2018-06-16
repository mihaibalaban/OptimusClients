import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { CentralBrainProvider } from '../../providers/central-brain/central-brain';
import { VoucherFormPage } from '../voucher-form/voucher-form';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
    private voucherSearchForm: FormGroup;
    showVoucherSearchForm: boolean = false;
    foundedVoucher;
    loader;
    isUsed: boolean;
    searchBy;
    error: boolean = false;

    constructor(public toastCtrl: ToastController,
        public navCtrl: NavController,
        public navParams: NavParams,
        private formBuilder: FormBuilder,
        public dataService: CentralBrainProvider,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController
    ) {

        this.voucherSearchForm = formBuilder.group({
            by: ['value'],
            value: ['value']
        });

    }

    ionViewWillEnter() {
        // this.voucher = null;
        // this.vouchers = null;
    }

    loadingCreator(message) {
        this.loader = this.loadingCtrl.create({
            content: message,
        });
    }
    loadingSpinnerPresent() {
        this.loader.present();
    }
    generateVoucher() {
        this.vouchers = [];
        this.loadingCreator("The voucher is in the oven!");
        const prompt = this.alertCtrl.create({
            title: 'Login',
            message: "Enter a name for this new album you're so keen on adding",
            inputs: [
                {
                    name: 'number',
                    placeholder: 'Numar'
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
                        if (data.number == "") {
                            data.number = "1"
                        }
                        if (Number.isInteger(parseInt(data.number.match(/\d+/)[0])))
                            this.voucherGenerator(parseInt(data.number.match(/\d+/)[0]));
                    }
                }
            ]
        });

        prompt.present();
        this.showVoucherSearchForm = false;

    }

    voucherGenerator(data) {
        this.dataService.generateVoucher(data).then(data => {
            this.voucher = data;
            this.isUsed = false;
            if (this.voucher.error) {
                this.error = true;
            }
            this.loader.dismiss();
        })
    }

    voucherTapped(voucher) {
        if (!voucher.error) {
            this.navCtrl.push(VoucherFormPage, {
                voucher: voucher,
                used: this.isUsed
            })
        } else {
            this.voucher.error = "Nu mai incerca sa dai click ca dai degeaba...insinstent mic"
        }
    }

    submit() {
        this.showVoucherSearchForm = false;
        this.voucherSearchForm.value;
        this.dataService.getSpecificVoucher(this.voucherSearchForm.value).then(data => {
            this.voucher = data;
            if (this.voucher.error) {
                this.error = true;
            }
            if (this.voucher.date != null) {
                this.isUsed = true;
            } else {
                this.isUsed = false;
            }
        });
    }

    getLastVouchers() {
        this.voucher = null;
        this.dataService.getLastVouchers().then(data => {
            this.vouchers = data;
            console.log(this.vouchers)
        })
    }

    getAllVouchers() {
        this.dataService.getAllVouchers().then(data => {
            this.vouchers = data;
            console.log(this.vouchers)
        })
    }

    searchVouchers() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Alege atributul');

        alert.addInput({
            type: 'radio',
            label: 'Referinta',
            value: 'reference',
        });
        alert.addInput({
            type: 'radio',
            label: 'Numar Inmatriculare',
            value: 'truck',
        });
        alert.addInput({
            type: 'radio',
            label: 'Voucher',
            value: 'voucher',
        });
        alert.addInput({
            type: 'radio',
            label: 'Invoice',
            value: 'invoice',
        });

        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: data => {
                this.showVoucherSearchForm = true;
                setTimeout(() => {
                    if (data == 'truck') {
                        this.searchBy = 'numarul de inmatriculare';
                    } else if (data == 'invoice') {
                        this.searchBy = 'invoice-ul';
                    } else if (data == 'reference') {
                        this.searchBy = 'referinta';
                    } else if (data == 'voucher') {
                        this.searchBy = 'valoarea voucher-ului';
                    }
                    this.voucherSearchForm.controls['by'].setValue(data);
                }, 0)
            }
        });
        alert.present();
    }

}