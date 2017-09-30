import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultHandlerComponent } from './result-handler.component';

describe('ResultHandlerComponent', () => {
  let component: ResultHandlerComponent;
  let fixture: ComponentFixture<ResultHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
