import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../components/counter/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient)
  constructor() { }

  getProducts() {
    return this.http.get<Product[]>(`https://api.escuelajs.co/api/v1/products`)
  }
  getOne(id:number) {
    return this.http.get<Product>(`https://api.escuelajs.co/api/v1/products/${id}`)
  }
}
