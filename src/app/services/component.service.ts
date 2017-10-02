import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ComponentService {

  private resultHandledSource = new Subject;
  private modalSource = new Subject;
  resultHandled$ = this.resultHandledSource.asObservable();
  modalSource$ = this.modalSource.asObservable();
  constructor() { }

  showResultHandling(success, message){
    return this.resultHandledSource.next({success, message});
  }

  showModal(boolean){
    return this.modalSource.next(boolean);
  }
}
