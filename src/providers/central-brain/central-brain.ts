import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CentralBrainProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CentralBrainProvider {

  constructor() {
    console.log('Hello CentralBrainProvider Provider');
  }

  filterItems(searchTerm, items) {

    return items.filter((item) => {
      return item.PARTENER.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });

  }
}
