import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../components/counter/models/product.model';
import { Category } from '../components/counter/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient)
constructor() { }

  getAll() {
    return this.http.get<Category[]>(`https://api.escuelajs.co/api/v1/categories`)
  }
}
