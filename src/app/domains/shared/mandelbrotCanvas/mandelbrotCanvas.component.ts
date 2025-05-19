import {
  AfterViewInit, Component, ElementRef, HostListener,
  Input, ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mandelbrot-canvas',
  standalone: true,
  imports: [CommonModule],
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host, canvas { width: 100%; height: 100%; display:block; cursor: crosshair; }
  `]
})
export class MandelbrotCanvasComponent implements AfterViewInit {

  @ViewChild('canvas', { static: true }) cvs!: ElementRef<HTMLCanvasElement>;

  /** 🔧 Resolución iterativa */
  @Input() maxIter = 80;

  // --- Estado del plano complejo (bounds) ---
  private xmin = -2.5;
  private xmax = 1;
  private ymin = -1.5;
  private ymax = 1.5;

  // --- Interacción pan/zoom ---
  private isPanning = false;
  private startPan = { x: 0, y: 0, xmin: 0, xmax: 0, ymin: 0, ymax: 0 };

  ngAfterViewInit() {
    this.resizeAndDraw();
    new ResizeObserver(() => this.resizeAndDraw()).observe(this.cvs.nativeElement);
  }

  /* 🖱️ Wheel = zoom */
  @HostListener('wheel', ['$event'])
  onWheel(ev: WheelEvent) {
    ev.preventDefault();
    const { offsetX, offsetY, deltaY } = ev;
    const zoomIn = deltaY < 0;
    const factor = zoomIn ? 0.8 : 1.25;
    this.zoom(offsetX, offsetY, factor);
  }

  /* 🖱️ Doble-click = zoom in x2 */
  @HostListener('dblclick', ['$event'])
  onDblClick(ev: MouseEvent) {
    this.zoom(ev.offsetX, ev.offsetY, 0.5);
  }

  /* 🖱️ Mouse down / move / up = pan */
  @HostListener('mousedown', ['$event'])
  onDown(ev: MouseEvent) {
    this.isPanning = true;
    this.startPan = {
      x: ev.clientX,
      y: ev.clientY,
      xmin: this.xmin, xmax: this.xmax,
      ymin: this.ymin, ymax: this.ymax
    };
  }
  @HostListener('mousemove', ['$event'])
  onMove(ev: MouseEvent) {
    if (!this.isPanning) return;
    const dx = ev.clientX - this.startPan.x;
    const dy = ev.clientY - this.startPan.y;
    const { width, height } = this.cvs.nativeElement;
    const dxRatio = dx / width;
    const dyRatio = dy / height;
    const xrange = this.startPan.xmax - this.startPan.xmin;
    const yrange = this.startPan.ymax - this.startPan.ymin;
    this.xmin = this.startPan.xmin - dxRatio * xrange;
    this.xmax = this.startPan.xmax - dxRatio * xrange;
    this.ymin = this.startPan.ymin + dyRatio * yrange;
    this.ymax = this.startPan.ymax + dyRatio * yrange;
    this.draw();
  }
  @HostListener('mouseup')
  @HostListener('mouseleave')
  onUp() { this.isPanning = false; }

  /* ------------------------------------------------------------------ */
  private zoom(px: number, py: number, factor: number) {
    const { width, height } = this.cvs.nativeElement;
    const cx = this.xmin + (px / width)  * (this.xmax - this.xmin);
    const cy = this.ymin + (py / height) * (this.ymax - this.ymin);
    const xrange = (this.xmax - this.xmin) * factor;
    const yrange = (this.ymax - this.ymin) * factor;
    this.xmin = cx - xrange / 2;
    this.xmax = cx + xrange / 2;
    this.ymin = cy - yrange / 2;
    this.ymax = cy + yrange / 2;
    this.draw();
  }

  /* ------------------------------------------------------------------ */
  private resizeAndDraw() {
    const canvas = this.cvs.nativeElement;
    const { clientWidth, clientHeight } = canvas;
    canvas.width = clientWidth;
    canvas.height = clientHeight;
    this.draw();
  }

  /* 🎨 Render Mandelbrot en el canvas */
  private draw() {
    const canvas = this.cvs.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const { width, height } = canvas;
    const img = ctx.createImageData(width, height);
    const data = img.data;

    const dx = (this.xmax - this.xmin) / width;
    const dy = (this.ymax - this.ymin) / height;

    let p = 0;
    for (let j = 0; j < height; j++) {
      const y0 = this.ymin + j * dy;
      for (let i = 0; i < width; i++) {
        const x0 = this.xmin + i * dx;
        let x = 0, y = 0, iter = 0;
        while (x*x + y*y <= 4 && iter < this.maxIter) {
          const xt = x*x - y*y + x0;
          y = 2*x*y + y0;
          x = xt;
          iter++;
        }
        // Color simple: HSL con base en iter
        const hue = iter === this.maxIter ? 0 : 360 * iter / this.maxIter;
        const [r,g,b] = this.hsl2rgb(hue, 70, iter === this.maxIter ? 0 : 50);
        data[p++] = r;
        data[p++] = g;
        data[p++] = b;
        data[p++] = 255; // alpha
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  /* 🎨 Convierte HSL a RGB rápido */
  private hsl2rgb(h: number, s: number, l: number): [number,number,number] {
    s /= 100; l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
  }
}
