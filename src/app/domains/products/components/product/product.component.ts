import { Product } from './../../../shared/components/counter/models/product.model';
import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input({required: true}) product!: Product;
  @Output() addToCard = new EventEmitter();

  addToCart(){
    console.log(this.product);
    this.addToCard.emit(this.product);
  }
}
