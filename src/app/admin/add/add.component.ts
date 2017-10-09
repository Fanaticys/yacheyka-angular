import { Component, OnInit, HostBinding, ViewChild } from '@angular/core';
import { BoxesService } from "../../core/boxes.service";
import { ComponentService } from "../../core/component.service";
import { adminRouteAnimation } from "../admin.animation";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
  animations: [ adminRouteAnimation ]
})
export class AddComponent implements OnInit {

  constructor(
    private boxesService: BoxesService,
    private componentService: ComponentService
  ) { }
  @HostBinding('@adminRouteAnimation') animation;
  ngOnInit() { }

  box = {
    bank_id: '102',
    bank: '102',
    address: '102',
    town: '102',
    height: '102',
    width: '102',
    length: '102',
    deposit: '102',
    min_term: '102',
    price_per_day: '102',
    price_per_month: '102',
    price_for_3_months: '102',
    price_for_6_months: '102',
    price_per_year: '102',
    price_more_year: '102' 
  };

  addBox(){
    this.boxesService.addBox(this.box).subscribe(
      success => this.componentService.showResultHandling('success', "Успешно добавлено"),
      err => this.componentService.showResultHandling('error', JSON.stringify(err)) 
    )
  }

}