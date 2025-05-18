import { Component, Input, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { OnInit, OnChanges, AfterViewInit, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() duration = 0; // Tiempo que se mostrará el mensaje (en segundos o milisegundos, según el uso)
  @Input() message = ''; // Mensaje a mostrar en pantalla

  // Lista de eventos de ciclo de vida que se pueden renderizar en la plantilla
  lifecycleLog: string[] = [];
  counter = signal<number>(0);
  conunterRef = 0;


  constructor(private cdr: ChangeDetectorRef) {
    const msg = 'constructor: antes de que se renderice el componente';
    this.lifecycleLog.push(msg);
    console.log('-'.repeat(10));
    console.log(msg);
    this.lifecycleLog.push(msg);
  }

  ngOnChanges(changes: SimpleChanges) {
    const msg = 'ngOnChanges: se ejecuta cuando cambia un @Input antes del render';
    console.log('-'.repeat(10));
    console.log(msg);
    console.log(changes);
    this.lifecycleLog.push(msg);

    const duration = changes['duration'];
    if (duration) {
      const changed = duration.currentValue !== duration.previousValue;
      console.log('¿Cambió duration?', changed);
      this.lifecycleLog.push(`Cambio en duration: de ${duration.previousValue} a ${duration.currentValue}`);
      this.doSomethisg();
    }
  }

  ngOnInit() {
    const msg = 'ngOnInit: justo después de que Angular inicializa el componente';
    console.log('-'.repeat(10));
    console.log(msg);
    console.log('Duration =>', this.duration);
    console.log('Message =>', this.message);
    this.lifecycleLog.push(msg);

    if (typeof window !== 'undefined') {
      this.conunterRef = window.setInterval(() => {
        this.counter.update(statePrev => statePrev + 1);
        console.log('Counter =>', this.counter());
      }, 1000);
    }
  }


  ngAfterViewInit() {
    setTimeout(() => {
      const msg = 'ngAfterViewInit: cuando la vista del componente ha sido completamente inicializada';
      console.log('-'.repeat(10));
      console.log(msg);
      this.lifecycleLog.push(msg);
    });
  }


  ngOnDestroy() {
    const msg = 'ngOnDestroy: justo antes de que el componente sea destruido';
    console.log('-'.repeat(10));
    console.log(msg);
    this.lifecycleLog.push(msg);

    if (typeof window !== 'undefined') {
      window.clearInterval(this.conunterRef);
      console.log('Counter =>', this.counter());
    }
  }


  doSomethisg() {
    const msg = 'doSomethisg(): lógica cuando cambia duration';
    console.log(msg);
    this.lifecycleLog.push(msg);
  }
}
