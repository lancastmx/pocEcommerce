import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
// models
import { Product } from '../../../shared/components/counter/models/product.model';

// services
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);

  constructor(private productService: ProductService) {
    this.products.set(this.productService.getProducts());
  }

  fromChild(event: string) {
    console.log('Te escucho hijo');
    console.log(event);
  }
}
