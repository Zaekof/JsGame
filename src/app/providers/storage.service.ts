import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  myStorage: typeof window.localStorage;

  constructor() {
    this.myStorage = window.localStorage;
  }

  setItem( name: string, data: any) {
    this.myStorage.setItem(name, data);
  }
  getItem( name: string ) {
    const item = this.myStorage.getItem(name);
    if (item !== 'undefined') {
      return item;
    }
  }
  removeItem( name: string ) {
    this.myStorage.removeItem(name);
  }
  clearItems() {
    this.myStorage.clear();
  }
}
