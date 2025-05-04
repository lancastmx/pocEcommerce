import { Component, Input, OnInit, OnDestroy, OnChanges, SimpleChanges, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LecturaBionicaPipe } from '../lectura-bionica.pipe';
// Interfaz simplificada, ya no necesitamos segmentIndex
interface WordSegment {
  text: string;
  isWord: boolean;
  wordIndex?: number; // Índice de la palabra (0, 1, 2...)
}
@Component({
  selector: 'app-word-highlighter',
  standalone: true,
  imports: [CommonModule, LecturaBionicaPipe],
  templateUrl: './word-highlighter.component.html',
  styleUrl: './word-highlighter.component.css'
})
export class WordHighlighterComponent {
  @Input() textToHighlight: string = ''; // Recibe el texto como Input

  // --- Estado del componente ---
  processedText: WordSegment[] = [];
  isActive: boolean = false;
  isPaused: boolean = false;
  activeWordIndex: number = -1; // -1 indica que no hay palabra activa inicialmente
  private totalWordCount: number = 0;
  private intervalId: any = null;

  // --- Configuración ---
  intervalMs: number = 600; // Intervalo base en ms (600ms ≈ 100 WPM)
  readonly minIntervalMs: number = 200;
  readonly maxIntervalMs: number = 2000;
  readonly speedStepMs: number = 100;
  readonly defaultWeight = 400;
  readonly highlightWeight = 700; // Solo usamos 700 y 400

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.parseText(this.textToHighlight);
    // No iniciar automáticamente
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si el texto de entrada cambia, reiniciar todo
    if (changes['textToHighlight']) {
      this.reset(); // Llama a reset para detener y limpiar
      this.parseText(this.textToHighlight); // Parsear el nuevo texto
    }
  }

  ngOnDestroy(): void {
    this.stopTimer(); // Asegurar limpieza
  }

  // --- Métodos de Control ---

  start(): void {
    if (this.totalWordCount === 0 || !isPlatformBrowser(this.platformId)) return;
    console.log('Start requested');
    this.stopTimer(); // Asegura que no haya timers previos
    this.isActive = true;
    this.isPaused = false;
    this.activeWordIndex = 0; // Empezar desde la primera palabra
    this.startTimer();
  }

  pause(): void {
    if (!this.isActive || this.isPaused || !isPlatformBrowser(this.platformId)) return;
    console.log('Pause requested');
    this.isPaused = true;
    this.stopTimer(); // Detener el avance
  }

  resume(): void {
    if (!this.isActive || !this.isPaused || !isPlatformBrowser(this.platformId)) return;
    console.log('Resume requested');
    this.isPaused = false;
    // activeWordIndex ya tiene la posición donde se pausó
    this.startTimer(); // Reanudar el avance
  }

  togglePauseResume(): void {
    if (!this.isActive) return; // No hacer nada si no está activo
    if (this.isPaused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  reset(): void {
    console.log('Reset requested');
    this.stopTimer(); // Detener timer
    this.isActive = false;
    this.isPaused = false;
    this.activeWordIndex = -1; // Quitar resaltado
    // Opcional: Resetear velocidad? De momento la mantenemos.
    // this.intervalMs = 600;
  }

  changeSpeed(deltaMs: number): void {
    const wasRunning = this.isActive && !this.isPaused;
    // Detener si estaba corriendo (necesario para cambiar intervalo)
    if (wasRunning && isPlatformBrowser(this.platformId)) {
      this.stopTimer();
    }

    // Calcular y aplicar nuevo intervalo con límites
    const newInterval = this.intervalMs + deltaMs;
    this.intervalMs = Math.max(this.minIntervalMs, Math.min(this.maxIntervalMs, newInterval));
    console.log(`New interval: ${this.intervalMs} ms (~${this.currentWpm} WPM)`);

    // Reiniciar si estaba corriendo
    if (wasRunning && isPlatformBrowser(this.platformId)) {
      this.startTimer();
    }
  }

  increaseSpeed(): void {
    this.changeSpeed(-this.speedStepMs);
  }

  decreaseSpeed(): void {
    this.changeSpeed(this.speedStepMs);
  }

  // --- Lógica Interna ---

  private startTimer(): void {
    // Validaciones extra
    if (!this.isActive || this.isPaused || this.intervalId || this.totalWordCount === 0 || !isPlatformBrowser(this.platformId)) return;

    console.log(`Starting timer with interval: ${this.intervalMs} ms`);
    // Asegurar que el índice es válido al empezar/reanudar
     if (this.activeWordIndex < 0 || this.activeWordIndex >= this.totalWordCount) {
         this.activeWordIndex = 0;
     }

    this.intervalId = setInterval(() => {
      this.activeWordIndex = (this.activeWordIndex + 1) % this.totalWordCount;
    }, this.intervalMs);
  }

  private stopTimer(): void {
    if (this.intervalId) {
      // console.log('Stopping timer...'); // Puede ser muy verboso
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // No reseteamos activeWordIndex aquí necesariamente,
    // reset() se encarga de eso si es necesario.
    // Al pausar, queremos mantener el índice.
  }

  private parseText(text: string | null | undefined): void {
    if (!text) {
      this.processedText = [];
      this.totalWordCount = 0;
      return;
    }
    const segments: WordSegment[] = [];
    const regex = /([a-zA-ZÀ-ÿüÜñÑ]+)|([^a-zA-ZÀ-ÿüÜñÑ]+)/g; // Misma regex
    let match;
    let currentWordIndex = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match[1]) { // Es una palabra
        // Guardamos la palabra completa como un solo segmento de palabra
        segments.push({ text: match[1], isWord: true, wordIndex: currentWordIndex });
        currentWordIndex++;
      } else if (match[2]) { // No es palabra (espacios, puntuación)
        segments.push({ text: match[2], isWord: false });
      }
    }
    this.processedText = segments;
    this.totalWordCount = currentWordIndex;
    console.log(`Parsed text, total words: ${this.totalWordCount}`);
  }

  // Calcula el peso para un segmento (palabra o no-palabra)
  getWordWeight(segment: WordSegment): number {
    // Si no está activo, pausado, o no es una palabra, peso normal
    if (!this.isActive || this.isPaused || !segment.isWord || segment.wordIndex === undefined) {
      return this.defaultWeight;
    }
    // Si es la palabra activa, peso resaltado, sino normal
    return segment.wordIndex === this.activeWordIndex ? this.highlightWeight : this.defaultWeight;
  }

  // Getter para WPM
  get currentWpm(): number {
    if (this.intervalMs <= 0) return 0;
    return Math.round(60 / (this.intervalMs / 1000));
  }
}
