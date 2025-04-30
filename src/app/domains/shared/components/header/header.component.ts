import { Component, Input, signal, inject, SimpleChanges } from '@angular/core';
import { Product } from '../../components/counter/models/product.model';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  @Input({required:true}) cart:Product[] = [];
  total = signal(0);

   toggleSideMenu() {
      this.hideSideMenu.update((prev) => !prev);
    }
    ngOnChanges(changes: SimpleChanges) {
      const cart = changes['cart'];
      if (cart) {
        this.total.set(this.calcularTotal());
      }
      console.log('Cambió el carrito', cart.currentValue);
    }
    calcularTotal() {
      return this.cart.reduce((total, product) => total + (product.price ?? 0), 0);
    }

}
