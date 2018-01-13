import { Component, OnInit, OnDestroy, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { routeAnimation } from "../route.animation";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	animations: [ routeAnimation ] 
})
export class HomeComponent implements OnInit, OnDestroy {
	@HostBinding('@routeAnimation') animation;

	constructor( @Inject(PLATFORM_ID) private platformId: Object) { }

	public bg = 'bg-1';
	public counter = 1;
	private changingInterval;

  ngOnInit() {
		if (isPlatformBrowser(this.platformId)) {
			this.changingInterval = Observable.interval(7000)
				.subscribe(() => {
					this.counter = (this.counter >= 3) ? 1 : ++this.counter;
					this.bg = 'bg-' + this.counter;
				});
		}
  }

  ngOnDestroy(){
  	if (this.changingInterval) {
			this.changingInterval.unsubscribe();
	  }
	}
	
}
