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
}
