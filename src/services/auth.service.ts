import { StorageService } from './storage.service';
import { LocalUser } from './../models/local-user';
import { API_CONFIG } from './../config/api.config';
import { HttpClient } from '@angular/common/http';
import { CredenciaisDTO } from './../models/credenciais.dto';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { CartService } from './domain/cart.service';

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(
    public http: HttpClient,
    public storage: StorageService,
    public cartService: CartService
  ) {}

  authenticate(credenciais: CredenciaisDTO) {
    return this.http.post(
      `${API_CONFIG.baseUrl}/login`,
      credenciais,
      {
        observe: 'response', // Capturar o HEADER
        responseType: 'text' // Evitor erro de parse de JSON em corpo vazio {}
      }
    );
  }

  refreshToken() {
    return this.http.post(
      `${API_CONFIG.baseUrl}/auth/refresh_token`,
      { },
      {
        observe: 'response', // Capturar o HEADER
        responseType: 'text' // Evitor erro de parse de JSON em corpo vazio {}
      }
    );
  }

  successfulLogin(authorizationValue: string) {
    let token = authorizationValue.substring(7);
    let localUser: LocalUser = {
      token: token,
      email: this.jwtHelper.decodeToken(token).sub
    };
    this.storage.setLocalUser(localUser);
    this.cartService.createOrClearCart();
  }

  logout() {
    this.storage.setLocalUser(null);
  }
}
