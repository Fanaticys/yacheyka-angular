import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { routeAnimation } from "../route.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	animations: [ routeAnimation ] 
})
export class HomeComponent implements OnInit, OnDestroy {
	@HostBinding('@routeAnimation') animation;

	public bg = 'bg-1';
	private changingInterval;

  constructor() { }

  ngOnInit() {
  	this.changeBg();
  }

  ngOnDestroy(){
  	if (this.changingInterval) {
	    clearInterval(this.changingInterval);
	  }
  }

  private changeBg(){
  	let i = 1;
  	this.changingInterval = setInterval(() => {
  		i = (i >= 3) ? 1 : ++i;
			this.bg = 'bg-' + i;
  	}, 7000);
  }

}
