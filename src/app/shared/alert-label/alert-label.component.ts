import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-label',
  templateUrl: './alert-label.component.html',
  styleUrls: ['./alert-label.component.css']
})
export class AlertLabelComponent implements OnInit {

  @Input() typeAlert: string;
  @Input() message: string;

  constructor() { }

  ngOnInit(): void {
  }

}
