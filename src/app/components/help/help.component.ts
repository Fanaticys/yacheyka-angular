import { Component, OnInit } from '@angular/core';
import { helpComponentAnimation } from '../../_animations/help-component.animation';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.sass'],
  animations: [ helpComponentAnimation ]
})
export class HelpComponent implements OnInit {

  show: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleShow(){
    this.show = !this.show;
  }

}
