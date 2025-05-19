
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MandelbrotCanvasComponent } from './mandelbrotCanvas.component';

describe('MandelbrotCanvasComponent', () => {
  let component: MandelbrotCanvasComponent;
  let fixture: ComponentFixture<MandelbrotCanvasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MandelbrotCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MandelbrotCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
