import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmTableComponent } from './adm-table.component';

describe('AdmTableComponent', () => {
  let component: AdmTableComponent;
  let fixture: ComponentFixture<AdmTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
