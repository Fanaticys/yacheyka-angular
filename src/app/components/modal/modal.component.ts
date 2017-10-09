import { Component, OnInit } from '@angular/core';
import { modalAnimation } from './modal.animation';
import { ComponentService } from '../../core/component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  animations: [modalAnimation]
})
export class ModalComponent implements OnInit {

  show: boolean;
  subscription: Subscription;
    constructor(private componentService: ComponentService) { }
  
    ngOnInit() {
      this.subscription = this.componentService.modalSource$.subscribe((boolean) => this.toggleShow(boolean));
    }

    ngOnDestroy(){
      this.subscription.unsubscribe();
    }
  
    toggleShow(boolean){
      this.show = boolean;
    }

}
