import { Component, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  @Input() img: string = "";
  @Input() price: number = 0;
  @Input() title: string = "";
  @Output() addToCard = new EventEmitter();

  addToCardHandler(){
    console.log('Hola pa')
    this.addToCard.emit('ya me escuchas padre')
  }
}
