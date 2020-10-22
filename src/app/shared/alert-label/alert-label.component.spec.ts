import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLabelComponent } from './alert-label.component';

describe('AlertLabelComponent', () => {
  let component: AlertLabelComponent;
  let fixture: ComponentFixture<AlertLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
