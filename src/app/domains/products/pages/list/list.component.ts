
import { Component, inject, Input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// components
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ProductComponent } from '../../components/product/product.component';
import { SierpinskiCanvasComponent } from '../../../shared/sierpinski-canvas/sierpinski-canvas.component';
import { MandelbrotCanvasComponent } from '../../../shared/mandelbrotCanvas/mandelbrotCanvas.component';
// models
import { Product } from '../../../shared/components/counter/models/product.model';
import { Category } from './../../../shared/components/counter/models/category.model';

// services
import { CartService } from './../../../shared/services/cart.service';
import { ProductService } from '../../../shared/services/product.service';
import { CategoryService } from '../../../shared/services/category.service';



@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  originalProducts = signal<Product[]>([]);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private CartService = inject(CartService);
  private productService = inject(ProductService);
  private CategoryService = inject(CategoryService);

  constructor() {

  }
  ngOnInit() {
   this.getProdct();
   this.getCategory();
  }
  addToCart(product: Product) {
    this.CartService.addToCart(product);
  }

  private getProdct() {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.originalProducts.set(products);
        this.products.set(products);
      },
    });
  }


 private getCategory(){
    this.CategoryService.getAll()
   .subscribe({
    next: (categories) => {
      this.categories.set(categories);
    },
   })
  }

  filterByCategory(categoryId: number) {
    const allProducts = this.originalProducts();
    const filtered = allProducts.filter(p => p.category.id === categoryId);
    this.products.set(filtered);
  }

  showAllProducts() {
    this.products.set(this.originalProducts());
  }
}
