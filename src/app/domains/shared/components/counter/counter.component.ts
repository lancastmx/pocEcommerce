import { Component, Input, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
 @Input() duration: number = 0;
 @Input() message: string = '';

 constructor(){
  console.log('constructor');
  console.log('-'.repeat(10))
 }

 ngOnChanges(changes: SimpleChange){
  console.log('constructor');
  console.log('-'.repeat(10));
  console.log(changes);
 }
}
