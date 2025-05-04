import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordHighlighterComponent } from './word-highlighter.component';

describe('WordHighlighterComponent', () => {
  let component: WordHighlighterComponent;
  let fixture: ComponentFixture<WordHighlighterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordHighlighterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordHighlighterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
