import { CartService } from './../../../shared/services/cart.service';
import { Component, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ProductComponent } from '../../components/product/product.component';
// models
import { Product } from '../../../shared/components/counter/models/product.model';

// services
import { ProductService } from '../../../shared/services/product.service';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  private CartService = inject(CartService);
  private productService = inject(ProductService);

  constructor() {

  }
  ngOnInit() {
   this.productService.getProducts()
   .subscribe({
    next: (products) => {
      this.products.set(products);
    },
   })

  }
  addToCart(product: Product) {
    this.CartService.addToCart(product);
  }

}
