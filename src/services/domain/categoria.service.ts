import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { API_CONFIG } from '../../config/api.config';
import { Observable } from 'rxjs/Rx';
import { CategoriaDTO } from '../../models/categoria.dto';

@Injectable()
export class CategoriaService {

  constructor(
    public http: HttpClient
  ) {}

  findAll(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);
  }

  getImageFromAssets(id: string) {
    let url = `./../../assets/imgs/cat${id}.jpg`;

    // blob -> o tipo da resposta será uma imagem
    return this.http.get(url, { responseType: 'blob' });
  }
}
