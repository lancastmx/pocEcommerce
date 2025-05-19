
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import { SierpinskiCanvasComponent } from './sierpinski-canvas.component';

describe('SierpinskiCanvasComponent', () => {
  let component: SierpinskiCanvasComponent;
  let fixture: ComponentFixture<SierpinskiCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SierpinskiCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SierpinskiCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
