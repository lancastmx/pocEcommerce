import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../components/counter/models/product.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products`);
  }
  getOne(id: number) {
    const url = `${environment.apiUrl}/api/v1/products/${id}`;
    return this.http.get<Product>(url);
  }
}
