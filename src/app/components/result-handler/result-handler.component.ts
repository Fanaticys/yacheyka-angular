import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ComponentService } from "../../core/component.service";

@Component({
  selector: 'app-result-handler',
  templateUrl: './result-handler.component.html',
  styleUrls: ['./result-handler.component.sass']
})
export class ResultHandlerComponent implements OnInit, OnDestroy {

  show: boolean = true;
  message: any = "Успешно добавлено";
  success: String;
  subscription;
  constructor(public componentService: ComponentService) { }

  ngOnInit() {
    this.subscription = this.componentService.resultHandled$.subscribe(({success, message}) => {
      this.showBlock(success, message);
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showBlock(success, message){
    this.message = message;
    this.success = success;
    this.show = true;
    setTimeout(() => {
      this.show = false;
      this.message = null;
      this.success = null;
    }, 2000);
  }

}
