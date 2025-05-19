import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Component
import { WaveAudioComponent } from '../../../products/components/wave-audio/wave-audio.component';
import { AUDIO_ASSETS } from '../../../../../assets/assets.constants';
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, WaveAudioComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  duration = signal(1000);
  message = signal('Hola');
  audioFile = AUDIO_ASSETS.pixelParadise;
  // audioFile = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  changeDuration(event: Event) {
    const input = event.target as HTMLInputElement;
    this.duration.set(input.valueAsNumber);
  }

  changeMessage(event: Event) {
    const input = event.target as HTMLInputElement;
    this.message.set(input.value);
  }
}
