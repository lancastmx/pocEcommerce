import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
// Component
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule,
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

 ngOnChanges(changes: SimpleChanges){
  // Before and during render
  console.log('-'.repeat(10));
  console.log('ngOnChange');
  console.log(changes);
  const duration = changes["duration"];
  console.log(duration && duration.currentValue !== duration.previousValue); // esta linea compara si el valor anterior es diferente al alvalo anterios
  if (duration){
    this.doSomethisg();
  }
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


 doSomethisg(){
  console.log('Testo de que si me la se hijos de su pinfloit')
 }
}
