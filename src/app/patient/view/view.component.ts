import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
 @Input() modal:any;
 @Input() data:any;
  constructor() { }

  ngOnInit() {}

}
