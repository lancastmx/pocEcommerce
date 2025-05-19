import { CartService } from './../../../shared/services/cart.service';
import { Component, inject, Input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/components/counter/models/product.model';
@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  @Input({ required: true }) id!: number;
  private productService = inject(ProductService);
  private CartService = inject(CartService);

  product = signal<Product | null>(null);
  cover = signal('');

  ngOnInit() {
    if (this.id) {
      this.productService.getOne(this.id).subscribe({
        next: (product) => {
          this.product.set(product);
          if (product.images.length > 0) {
            this.cover.set(product.images[0]);
          }
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }
  chagecover(newImg: string) {
    this.cover.set(newImg);
  }

  addTocart() {
    const product = this.product();
    if (product) {
      this.CartService.addToCart(product);
    }
  }
}
