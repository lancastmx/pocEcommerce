import { Product } from './../../../shared/components/counter/models/product.model';
import {
  Component,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
  @Output() addToCard = new EventEmitter();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  addToCart() {
    this.addToCard.emit(this.product);
  }
}
