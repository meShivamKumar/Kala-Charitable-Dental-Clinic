import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss'],
})
export class PrintComponent implements OnInit {

  constructor() { }
  @Input() patient:any;
  @Input() treatment:any[];
  ngOnInit() {}

}
