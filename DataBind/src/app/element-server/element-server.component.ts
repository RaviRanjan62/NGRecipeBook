import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element-server',
  templateUrl: './element-server.component.html',
  styleUrls: ['./element-server.component.css']
})
export class ElementServerComponent implements OnInit {

  @Input() element:{type:string;name:string;content:string}

  constructor() { }

  ngOnInit() {
  }

}
