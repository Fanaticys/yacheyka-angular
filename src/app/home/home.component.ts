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

	public images = ['../../assets/img/1.jpg', '../../assets/img/2.jpg', '../../assets/img/3.jpg'];
	public bg = '../../assets/img/2.jpg';
	public counter = 0;
	private changingInterval;
	private loadedImages = 0;

  ngOnInit() {
		// this.loadImages();
  }

  ngOnDestroy(){
  	if (this.changingInterval) {
			this.changingInterval.unsubscribe();
	  }
	}

	loadImages(){
		this.images.forEach(image => {
			let i = new Image();
			i.onload = () => {
				this.loadedImages++;
				if (this.loadedImages == this.images.length) {
					this.changeBG();
				}
			};
			i.src = image;
		});
	}

	changeBG(){
		if (isPlatformBrowser(this.platformId)) {
			this.bg = this.images[this.counter];
			this.changingInterval = Observable.interval(3000)
				.subscribe(() => {
					this.counter = (this.counter == this.images.length - 1) ? 0 : ++this.counter;
					this.bg = this.images[this.counter];
				});
		}
	}

}