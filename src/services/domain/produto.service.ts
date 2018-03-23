import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImage(id: string): Observable<any> {
    let url = `./../../assets/imgs/prod${id}-small.jpg`;

    // blob -> o tipo da resposta será uma imagem
    return this.http.get(url, { responseType: 'blob' });
  }
}
