import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Passou no interceptor");
    // Passa a requisicao para frente
    return next.handle(req)
    .catch((error, caught) => {
      let errorObj = error;

      // Pegando somente os valores de error
      if (errorObj.error) {
        errorObj = errorObj.error;
      }

      // Verifica se o erroObj é JSON e se nao for transforma para JSON
      if(!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro:");
      console.log(errorObj);

      // Passa o erro para frente
      return Observable.throw(error);
    }) as any;
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
