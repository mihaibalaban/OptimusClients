import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CentralBrainProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class CentralBrainProvider {
  MOBILE_API_TEST;
  _headers;
  constructor(
    public http: Http,
  ) {
    console.log('Hello CentralBrainProvider Provider');
    this.MOBILE_API_TEST = "http://optimus-transport.ro/mobile-api/";
    // this.MOBILE_API_TEST = "http://localhost/optimus/frontend/web/mobile-api/"
    this._headers = new Headers();
    this._headers.append('Content-Type', 'application/json');
  }

  filterItems(searchTerm, items) {

    return items.filter((item) => {
      return item.PARTENER.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }

  getSpecificVoucher(data) {
    data.by
    let by = data.by;
    let value = data.value
    let body = { by: by, value: value };
    console.log(body)
    return new Promise(resolve => {
      this.http.post(this.MOBILE_API_TEST + 'get-specific-vouchers', body, { headers: this._headers })
        .map(res => res.json())
        .subscribe(data => {
          let response = data;
          resolve(response);
        });
    });
  }

  getAllVouchers() {
    return new Promise(resolve => {
      this.http.get(this.MOBILE_API_TEST + 'get-all-vouchers', { headers: this._headers })
        .map(res => res.json())
        .subscribe(data => {
          let response = data;
          console.log(data);
          resolve(response);
        });
    });
  }

  getLastVouchers() {
    return new Promise(resolve => {
      this.http.get(this.MOBILE_API_TEST + 'get-last-vouchers', { headers: this._headers })
        .map(res => res.json())
        .subscribe(data => {
          let response = data;
          resolve(response);
        });
    });
  }

  generateVoucher() {
    return new Promise(resolve => {
      this.http.get(this.MOBILE_API_TEST + 'generate-voucher', { headers: this._headers })
        .map(res => res.json())
        .subscribe(data => {
          let response = data;
          resolve(response);
        });
    });
  }

  updateVoucher(data) {
    let body = data;
    return new Promise(resolve => {
      this.http.post(this.MOBILE_API_TEST + 'update-voucher', body, { headers: this._headers })
        .map(res => res.json())
        .subscribe(data => {
          let response = data;

          resolve(response);
        });
    });
  }

}
