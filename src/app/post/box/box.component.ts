import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.css'],
})
export class BoxComponent implements OnInit {
  @Input() header;
  @Input() users;
  @Output() close = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.close.emit();
  }
}
