import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AsyncPipe } from '@angular/common';
import { Http, HttpModule, Headers } from '@angular/http';
////////////////////////////////////////////////////Pages
import { MyApp } from './app.component';
import { VoucherPage } from '../pages/voucher/voucher';
import { VoucherFormPage } from '../pages/voucher-form/voucher-form';
import { HomePage } from '../pages/home/home';
import { PartnerPage } from '../pages/partner/partner';
import { AddClientPage } from '../pages/add-client/add-client';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

///////////////////////////////////////////////////FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated';
import { CentralBrainProvider } from '../providers/central-brain/central-brain';

export const firebaseConfig = {
  apiKey: "pGrWboSLl8DyysZDijDpoKNVz9MjCjNYDFkLWPFj",
  authDomain: "optimusclients-2990c.firebaseapp.com",
  databaseURL: "https://optimusclients-2990c.firebaseio.com",
  storageBucket: "optimusclients-2990c.com",
  messagingSenderId: '269488846976'
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VoucherPage,
    PartnerPage,
    AddClientPage,
    VoucherFormPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VoucherPage,
    PartnerPage,
    AddClientPage,
    VoucherFormPage,
  ],
  providers: [
    StatusBar,
    AngularFireModule,
    AngularFireDatabase,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CentralBrainProvider
  ]
})
export class AppModule { }
