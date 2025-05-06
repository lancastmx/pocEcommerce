import { Product } from './../../../shared/components/counter/models/product.model';
import { Component, Output, EventEmitter, SimpleChanges, Inject, PLATFORM_ID, OnInit, OnDestroy, OnChanges, input } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
interface TextSegment {
  text: string;
  isWord: boolean;
  wordIndex?: number;     // Índice de la palabra (0, 1, 2...)
  segmentIndex?: number;  // Índice dentro de la palabra (0=inicio, 1=medio, 2=fin)
}
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit, OnDestroy, OnChanges{
  readonly product = input.required<Product>();
  @Output() addToCard = new EventEmitter();
  // Texto y procesamiento (sin cambios)
  miTextoParaResaltar = "El sol apenas despuntaba cuando Mateo, el farero, subió la interminable escalera de caracol. Cada noche, su luz era la guía segura para los barcos perdidos en la niebla. Esa mañana, sin embargo, encontró una pequeña gaviota con un ala herida en el balcón del faro. Con cuidado, la recogió y la llevó a su cálida cocina. Durante días, la alimentó y vendó su ala, hablándole de mareas y constelaciones. Cuando la gaviota finalmente pudo volar, dio tres vueltas alrededor del faro antes de perderse en el azul infinito, un silencioso agradecimiento al guardián de la costa.";

  private readonly loremIpsumText = "El sol apenas despuntaba cuando Mateo, el farero, subió la interminable escalera de caracol. Cada noche, su luz era la guía segura para los barcos perdidos en la niebla. Esa mañana, sin embargo, encontró una pequeña gaviota con un ala herida en el balcón del faro. Con cuidado, la recogió y la llevó a su cálida cocina. Durante días, la alimentó y vendó su ala, hablándole de mareas y constelaciones. Cuando la gaviota finalmente pudo volar, dio tres vueltas alrededor del faro antes de perderse en el azul infinito, un silencioso agradecimiento al guardián de la costa.";
// (102 palabras)
//  private readonly loremIpsumText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  processedText: TextSegment[] = [];
  private totalWordCount: number = 0;

  // --- NUEVAS PROPIEDADES PARA CONTROLES ---
  isWaveActive: boolean = false; // Estado de activación de la ola
  waveIntervalMs: number = 600; // Intervalo base en ms (600ms ≈ 100 WPM)
  readonly minIntervalMs: number = 200; // Límite rápido (aprox. 300 WPM)
  readonly maxIntervalMs: number = 2000; // Límite lento (aprox. 30 WPM)
  readonly speedStepMs: number = 100; // Incremento/decremento de velocidad

  // Propiedades existentes adaptadas
  activeWordIndex: number = -1;
  private intervalId: any = null;
  private readonly defaultWeight = 400;
  private readonly mediumWeight = 600;
  private readonly heavyWeight = 800;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.parseAndSetText(this.loremIpsumText);
    // El timer ya NO se inicia automáticamente aquí
  }

  ngOnChanges(changes: SimpleChanges): void {
     if (changes['product'] && !changes['product'].firstChange) {
       console.log('Product input changed:', this.product());
     }
     // Si el producto cambia, podríamos querer detener la ola si está activa
     // if(this.isWaveActive) {
     //    this.stopWaveTimer();
     //    this.isWaveActive = false;
     // }
  }

  ngOnDestroy(): void {
    // Asegurarse de parar el timer al destruir
    this.stopWaveTimer();
  }

  addToCart() {
    this.addToCard.emit(this.product());
  }

  // --- NUEVOS MÉTODOS PARA CONTROLES ---

  toggleWave(): void {
    this.isWaveActive = !this.isWaveActive;
    if (this.isWaveActive) {
      // Solo iniciar si estamos en el navegador
      if (isPlatformBrowser(this.platformId)) {
        this.startWaveTimer();
      }
    } else {
      // Siempre podemos intentar detener, stopWaveTimer maneja si existe o no
      this.stopWaveTimer();
    }
  }

  changeSpeed(deltaMs: number): void {
    const newInterval = this.waveIntervalMs + deltaMs;
    // Aplicar límites (clamp)
    this.waveIntervalMs = Math.max(this.minIntervalMs, Math.min(this.maxIntervalMs, newInterval));
    console.log(`New wave interval: ${this.waveIntervalMs} ms (~${this.currentWpm} WPM)`);

    // Si la ola está activa, reiniciar el timer con la nueva velocidad
    if (this.isWaveActive && isPlatformBrowser(this.platformId)) {
      this.stopWaveTimer(); // Detiene el actual y resetea activeWordIndex
      this.startWaveTimer(); // Inicia uno nuevo con el nuevo intervalo
    }
  }

  increaseSpeed(): void {
    // Disminuir el intervalo aumenta la velocidad
    this.changeSpeed(-this.speedStepMs);
  }

  decreaseSpeed(): void {
    // Aumentar el intervalo disminuye la velocidad
    this.changeSpeed(this.speedStepMs);
  }

  // Getter opcional para mostrar WPM
  get currentWpm(): number {
    if (this.waveIntervalMs <= 0) return 0;
    return Math.round(60 / (this.waveIntervalMs / 1000));
  }

  // --- MÉTODOS DEL TIMER MODIFICADOS ---

  private startWaveTimer(): void {
    // No iniciar si ya corre, si está desactivada, si no hay palabras o no estamos en browser
    if (!this.isWaveActive || this.intervalId || this.totalWordCount === 0 || !isPlatformBrowser(this.platformId)) return;

    console.log(`Starting wave timer with interval: ${this.waveIntervalMs} ms`);
    this.activeWordIndex = 0; // Empezar desde la primera palabra

    this.intervalId = setInterval(() => {
      this.activeWordIndex = (this.activeWordIndex + 1) % this.totalWordCount;
    }, this.waveIntervalMs); // Usar el intervalo actual
  }

  private stopWaveTimer(): void {
    if (this.intervalId) {
      console.log('Stopping wave timer...');
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.activeWordIndex = -1; // Resetear índice para quitar el efecto visual
    }
  }

  // --- PARSEO Y GETWEIGHT (MODIFICADO GETWEIGHT) ---
  private parseAndSetText(text: string | null | undefined): void {
    // ... (Lógica de parseo sin cambios, sigue calculando totalWordCount) ...
    if (!text) { this.processedText = []; this.totalWordCount = 0; return; }
    const segments: TextSegment[] = []; const regex = /([a-zA-ZÀ-ÿüÜñÑ]+)|([^a-zA-ZÀ-ÿüÜñÑ]+)/g; let match; let currentWordIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match[1]) {
        const word = match[1]; const len = word.length;
        if (len <= 1) { segments.push({ text: word, isWord: true, wordIndex: currentWordIndex, segmentIndex: 0 }); }
        else if (len <= 3) { segments.push({ text: word.substring(0, 1), isWord: true, wordIndex: currentWordIndex, segmentIndex: 0 }); segments.push({ text: word.substring(1), isWord: true, wordIndex: currentWordIndex, segmentIndex: 2 }); }
        else { const index1 = Math.max(1, Math.ceil(len * 0.3)); const index2 = Math.max(index1 + 1, Math.ceil(len * 0.6)); const part1 = word.substring(0, index1); const part2 = word.substring(index1, index2); const part3 = word.substring(index2); if (part1) segments.push({ text: part1, isWord: true, wordIndex: currentWordIndex, segmentIndex: 0 }); if (part2) segments.push({ text: part2, isWord: true, wordIndex: currentWordIndex, segmentIndex: 1 }); if (part3) segments.push({ text: part3, isWord: true, wordIndex: currentWordIndex, segmentIndex: 2 }); }
        currentWordIndex++;
      } else if (match[2]) { segments.push({ text: match[2], isWord: false }); }
    }
    this.processedText = segments; this.totalWordCount = currentWordIndex;
  }

  getWeight(segment: TextSegment): number {
    // Si la ola está apagada o no es palabra válida, peso normal
    if (!this.isWaveActive || !segment.isWord || segment.wordIndex === undefined || segment.segmentIndex === undefined || this.activeWordIndex < 0) {
      return this.defaultWeight;
    }

    // Lógica de cálculo de peso basada en distancia (sin cambios)
    const distance = segment.wordIndex - this.activeWordIndex;
    if (distance === 0) {
      if (segment.segmentIndex === 0) return this.heavyWeight;
      if (segment.segmentIndex === 1) return this.mediumWeight;
      return this.defaultWeight;
    } else if (distance === -1 || distance === 1) {
      if (segment.segmentIndex === 0) return this.mediumWeight;
      return this.defaultWeight;
    } else {
      return this.defaultWeight;
    }
  }
}
