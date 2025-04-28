import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../components/counter/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart =signal<Product[]>([]);

  total = computed(() => {
    const cart = this.cart();
    return cart.reduce((total, product) => total + (product.price ?? 0), 0);
  });

  constructor() { }


  addToCart(product: Product) {
    this.cart.update(state => [...state, product]);
  //   const existingProduct = this.cart().find(item => item.id === product.id);
  //   if (existingProduct) {
  //     existingProduct.quantity! += product.quantity!;
  //   } else {
  //     this.cart.update(cart => [...cart, product]);
  //   }
  }
}
