import { Component, Input, signal, inject } from '@angular/core';
import { Product } from '../../components/counter/models/product.model';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../../products/components/product/product.component';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() cart:Product[] = [];

  injectedCartService = inject(CartService);
  total = this.injectedCartService.total;
 hideSideMenu = signal(true);
   toggleSideMenu() {
      this.hideSideMenu.update((prev) => !prev);
    }
}
