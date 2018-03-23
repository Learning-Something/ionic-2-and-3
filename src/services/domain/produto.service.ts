import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO

import { ProdutoDTO } from './../../models/produto.dto';

@Injectable()
export class ProdutoService {

  constructor(public http: HttpClient) {
  }

  findById(produto_id : string) {
    return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
  }

  findByCategoria(categoria_id : string) {
    return this.http.get(`${API_CONFIG.baseUrl}/produtos/?categorias=${categoria_id}`);
  }

  getSmallImage(id: string): Observable<any> {
    let url = `./../../assets/imgs/prod${id}-small.jpg`;

    // blob -> o tipo da resposta será uma imagem
    return this.http.get(url, { responseType: 'blob' });
  }

  getImage(id: string): Observable<any> {
    let url = `./../../assets/imgs/prod${id}.jpg`;

    // blob -> o tipo da resposta será uma imagem
    return this.http.get(url, { responseType: 'blob' });
  }
}
