import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sierpinski-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`,
  // Apenas un borde para ver el lienzo
  styles: [`
    :host { display:block; }
    canvas { width:100%; height:100%; border:1px solid #000; }
  `]
})
export class SierpinskiCanvasComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasEl!: ElementRef<HTMLCanvasElement>;

  /** 🔢 Profundidad recursiva (más → más detalle → más draw calls) */
  @Input() depth: number = 6;

  /** 🎨 Color de relleno */
  @Input() fill = '#000';

  /** ↕️ Responsive: redibuja al cambiar size del host */
  private resizeObserver?: ResizeObserver;

  ngAfterViewInit() {
    // Dibujar una primera vez y redibujar si el host cambia de tamaño
    this.draw();
    this.resizeObserver = new ResizeObserver(() => this.draw());
    this.resizeObserver.observe(this.canvasEl.nativeElement);
  }

  /** ----------------------------------------------------------------
   *  🖌️ Lógica de dibujo recursivo – IFS estilo Sierpinski
   *  ---------------------------------------------------------------*/
  private draw() {
    const canvas = this.canvasEl.nativeElement;
    const ctx = canvas.getContext('2d')!;
    // Ajustar resolución según el tamaño real del host
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w;
    canvas.height = h;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = this.fill;

    // Triángulo equilátero inscrito en el canvas
    const p1 = { x: w / 2,      y: 0 };
    const p2 = { x: 0,          y: h };
    const p3 = { x: w,          y: h };

    this.drawTriangle(ctx, p1, p2, p3, this.depth);
  }

  /** 🚩 Función recursiva */
  private drawTriangle(
    ctx: CanvasRenderingContext2D,
    a: { x: number; y: number },
    b: { x: number; y: number },
    c: { x: number; y: number },
    n: number
  ) {
    if (n === 0) {
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineTo(c.x, c.y);
      ctx.closePath();
      ctx.fill();
      return;
    }

    // Encontrar puntos medios
    const ab = this.midPoint(a, b);
    const bc = this.midPoint(b, c);
    const ca = this.midPoint(c, a);

    // Repetir recursión en los 3 sub‑triángulos (descartamos el central)
    this.drawTriangle(ctx, a,   ab, ca, n - 1);
    this.drawTriangle(ctx, ab,  b,  bc, n - 1);
    this.drawTriangle(ctx, ca,  bc, c,  n - 1);
  }

  /** 🧮 Helper */
  private midPoint(p: {x:number;y:number}, q:{x:number;y:number}) {
    return { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
  }
}
