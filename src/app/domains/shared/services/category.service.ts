import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../components/counter/models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);

  getAll() {
    return this.http.get<Category[]>(`${environment.apiUrl}/api/v1/categories`);
  }
}
