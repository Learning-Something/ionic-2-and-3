import { FieldMessage } from './../models/field-message';
import { AlertController } from "ionic-angular";
import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    public storage: StorageService,
    public alertCtrl: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Passa a requisicao para frente
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;

      // Pegando somente os valores de error
      if (errorObj.error) {
        errorObj = errorObj.error;
      }

      // Verifica se o erroObj é JSON e se nao for transforma para JSON
      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro:");
      console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.handle403();
          break;

        case 422:
          this.handle422(errorObj);
          break;

        default:
          this.handleDefaultError(errorObj);
      }

      // Passa o erro para frente
      return Observable.throw(error);
    }) as any;
  }

  handle401() {
    let alert = this.alertCtrl.create({
      title: "Erro 401: Falha de autenticação",
      message: "Email ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }

  handle403() {
    this.storage.setLocalUser(null);
  }

  handle422(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro de validação!',
      message: this.list422Errors(errorObj.errors),
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{ text: "Ok" }]
    });
    alert.present();
  }

  private list422Errors(messages: FieldMessage[]): string {
    let s: string = '';
    for(var i=0; i<messages.length; i++) {
      s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
    }

    return s;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
