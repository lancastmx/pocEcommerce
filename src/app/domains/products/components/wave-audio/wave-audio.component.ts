import { Component, ElementRef, Input, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import WaveSurfer from 'wavesurfer.js';
@Component({
  selector: 'app-wave-audio',
  imports: [
    CommonModule,
  ],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.css'
})
export class WaveAudioComponent {
  @Input() audioUrl: string = '';
  @ViewChild('waveform', { static: true }) container!: ElementRef;

  private waveSurfer: WaveSurfer | undefined;
  isPlaying =  signal<boolean>(false);

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && this.audioUrl) {
      import('wavesurfer.js').then(WaveSurfer => {
        this.waveSurfer = WaveSurfer.default.create({
          container: this.container.nativeElement,
          waveColor: 'violet',
          progressColor: 'purple',
          height: 128,
        });

        this.waveSurfer.load(this.audioUrl);

        console.log('WaveSurfer instance created with URL:', this.audioUrl);
      });
    }
  }
  playPause() {
    if (this.waveSurfer) {
      this.waveSurfer.playPause(); // Alterna play/pause
      this.isPlaying.set(this.waveSurfer.isPlaying())
    }
    console.log('WaveSurfer instance created with URL:', this.audioUrl);
  }

}

