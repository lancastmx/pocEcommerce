import { Component, Input, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
// Component
import { ProductComponent } from '../../../products/components/product/product.component';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule,
    ProductComponent
  ],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
 @Input() duration: number = 0;
 @Input() message: string = '';

 constructor(){
    // Before render
  console.log('-'.repeat(10))
  console.log('constructor');

 }

 ngOnChanges(changes: SimpleChange){
  // Before and during render
  console.log('-'.repeat(10));
  console.log('ngOnChange');
  console.log(changes);
 }

 ngOnInit(){
    // Before and during render
    console.log('-'.repeat(10));
    console.log('ngOnInit');
    console.log('Duration =>', this.duration)
    console.log('Message =>', this.message)
 }
 ngAfterViewInit(){
  console.log('-'.repeat(10));
  console.log('ngAfterViewInit');
 }

 ngOnDestroy(){
  console.log('-'.repeat(10));
  console.log('ngOnDestroy');
 }
}
