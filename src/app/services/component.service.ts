import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ComponentService {

  private resultHandledSource = new Subject;
  resultHandled$ = this.resultHandledSource.asObservable();
  constructor() { }

  showResultHandling(success, message){
    return this.resultHandledSource.next({success, message});
  }
}
