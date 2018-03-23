import { Cart } from './../models/cart';
import { LocalUser } from './../models/local-user';
import { Injectable } from '@angular/core';
import { STORAGE_KEYS } from '../config/storage_keys.config';

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let localUser = localStorage.getItem(STORAGE_KEYS.localUser);
    if ( localUser == null ) {
      return null;
    } else {
      return JSON.parse(localUser);
    }
  }

  setLocalUser(localUser: LocalUser) {
    if (localUser == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(localUser));
    }
  }

  getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);
    if ( cart == null ) {
      return null;
    } else {
      return JSON.parse(cart);
    }
  }

  setCart(cart: Cart) {
    if (cart == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    }
  }
}
