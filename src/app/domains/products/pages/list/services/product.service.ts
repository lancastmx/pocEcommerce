import { Injectable } from '@angular/core';
import { Product } from '../../../../shared/components/counter/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts(): Product[] {
    return [
      {
        id: 1,
        title: 'Product 1',
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 10.99,
        image: 'https://picsum.photos/200/300',
        img: 'https://picsum.photos/200/300',
        stock: 100,
        category: 'Category 1',
        rating: 4.5,
        reviews: 10,
        isFavorite: false,
        quantity: 1
      },
      {
        id: 2,
        title: 'Product 2',
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 20.99,
        image: 'https://picsum.photos/200/300',
        img: 'https://picsum.photos/200/300',
        stock: 50,
        category: 'Category 2',
        rating: 4.0,
        reviews: 5,
        isFavorite: true,
        quantity: 2
      },
      {
        id: 3,
        title: 'Product 3',
        name: 'Product 3',
        description: 'Description for Product 3',
        price: 30.99,
        image: 'https://picsum.photos/200/300',
        img: 'https://picsum.photos/200/300',
        stock: 25,
        category: 'Category 3',
        rating: 3.5,
        reviews: 8,
        isFavorite: false,
        quantity: 3
      }
    ];
  }
}
