import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../../shared/components/counter/counter.component';
// Component
import { ProductComponent } from '../../../products/components/product/product.component';
import { WaveAudioComponent } from '../../../products/components/wave-audio/wave-audio.component';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    CounterComponent,
    ProductComponent,
    WaveAudioComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
 duration = signal(1000)
 message = signal('Hola')

 changeDuration(event: Event){
  const input = event.target as HTMLInputElement;
  this.duration.set(input.valueAsNumber)
 }

 changeMessage(event: Event){
  const input = event.target as HTMLInputElement;
  this.message.set(input.value)
 }
}
