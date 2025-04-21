import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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

  ngAfterViewInit() {
    WaveSurfer.create({
      url: this.audioUrl,
      container: this.container.nativeElement,
    })
  }
}
