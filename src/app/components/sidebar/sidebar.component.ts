import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { URLSearchParams } from "@angular/http";
import { BoxesService } from "../../_services/boxes.service";

@Component({
	selector: 'sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrls: ['sidebar.component.sass']
})

export class SidebarComponent implements OnInit {
	public show: boolean = false;
	public showSlider: boolean = false;
	public rangeValues;
	public priceRange;
	public heightRange;
	public widthRange;
	public lengthRange;
	public depositRange;
	public min_termRange;
	public startPrice;
	public endPrice;
	public startHeight;
	public endHeight;
	public startWidth;
	public endWidth;
	public startLength;
	public endLength;
	public startDeposit;
	public endDeposit;
	public startMin_term;
	public endMin_term;
	public towns;
	public town = "";
	public term = 'price_per_day';
	public banks;
	@Output() search = new EventEmitter();
	@Output() paramsUpdated = new EventEmitter();
	public get checkedBanks(){
		return this.banks
					.filter(bank => bank.checked)
					.map(bank => bank.value);
	}
	public set _startPrice(value){
		this.startPrice = value < this.rangeValues.minPrice ? this.rangeValues.minPrice : value > this.endPrice ? this.endPrice : value;
	}
	public set _endPrice(value){
		this.endPrice = value > this.rangeValues.maxPrice ? this.rangeValues.maxPrice : value < this.startPrice ? this.startPrice : value;
	}
	public set _startHeight(value){
		this.startHeight = value < this.rangeValues.minHeight ? this.rangeValues.minHeight : value > this.endHeight ? this.endHeight : value;
	}
	public set _endHeight(value){
		this.endHeight = value > this.rangeValues.maxHeight ? this.rangeValues.maxHeight : value < this.startHeight ? this.startHeight : value;
	}
	public set _startWidth(value){
		this.startWidth = value < this.rangeValues.minWidth ? this.rangeValues.minWidth : value > this.endWidth ? this.endWidth : value;
	}
	public set _endWidth(value){
		this.endWidth = value > this.rangeValues.maxWidth ? this.rangeValues.maxWidth : value < this.startWidth ? this.startWidth : value;
	}
	public set _startLength(value){
		this.startLength = value < this.rangeValues.minLength ? this.rangeValues.minLength : value > this.endLength ? this.endLength : value;
	}
	public set _endLength(value){
		this.endLength = value > this.rangeValues.maxLength ? this.rangeValues.maxLength : value < this.startLength ? this.startLength : value;
	}
	public set _startDeposit(value){
		this.startDeposit = value < this.rangeValues.minDeposit ? this.rangeValues.minDeposit : value > this.endDeposit ? this.endDeposit : value;
	}
	public set _endDeposit(value){
		this.endDeposit = value > this.rangeValues.maxDeposit ? this.rangeValues.maxDeposit : value < this.startDeposit ? this.startDeposit : value;
	}
	public set _startMin_term(value){
		this.startMin_term = value < this.rangeValues.minMinTerm ? this.rangeValues.minMinTerm : value > this.endMin_term ? this.endMin_term : value;
	}
	public set _endMin_term(value){
		this.endMin_term = value > this.rangeValues.maxMinTerm ? this.rangeValues.maxMinTerm : value < this.startMin_term ? this.startMin_term : value;
	}
	
	constructor(private boxesService: BoxesService){
		this.getRangeValues();
		this.boxesService.getBanks().subscribe(data => this.banks = data);
		this.boxesService.getTowns().subscribe(data => this.towns = data);
	}

	ngOnInit(){ }

	getRangeValues(){
		this.boxesService.getRangeValues().subscribe(data => {
			this.rangeValues = data;
			// START // Just for slider's work. With full BD you can remove it!
			if(data.maxDeposit == 0){
				this.rangeValues.maxDeposit = 1;	
			}
			if(data.maxMinTerm == 1){
				this.rangeValues.maxMinTerm = 2;	
			}
			// END // Just for slider's work. With full BD you can remove it!
			this.setRangeValues();
			this.showSlider = true;
		});
	}

	setRangeValues(){
		this.startPrice = this.rangeValues.minPrice;
		this.endPrice = this.rangeValues.maxPrice;
		this.startHeight = this.rangeValues.minHeight;
		this.endHeight = this.rangeValues.maxHeight;
		this.startWidth = this.rangeValues.minWidth;
		this.endWidth = this.rangeValues.maxWidth;
		this.startLength = this.rangeValues.minLength;
		this.endLength = this.rangeValues.maxLength;
		this.startDeposit = this.rangeValues.minDeposit;
		this.endDeposit = this.rangeValues.maxDeposit;
		this.startMin_term = this.rangeValues.minMinTerm;
		this.endMin_term = this.rangeValues.maxMinTerm;
		this.priceRange = [this.startPrice, this.endPrice];
		this.heightRange = [this.startHeight, this.endHeight];
		this.widthRange = [this.startWidth, this.endWidth];
		this.lengthRange = [this.startLength, this.endLength];
		this.depositRange = [this.startDeposit, this.endDeposit];
		this.min_termRange = [this.startMin_term, this.endMin_term];
	}

	toggleSidebar(){
		this.show = !this.show;
	}

	changeRange() {
    this.priceRange = [this.startPrice, this.endPrice];
    this.heightRange = [this.startHeight, this.endHeight];
	this.widthRange = [this.startWidth, this.endWidth];
	this.lengthRange = [this.startLength, this.endLength];
	this.depositRange = [this.startDeposit, this.endDeposit];
	this.min_termRange = [this.startMin_term, this.endMin_term];
  }

  updateParams(){
  	let params = {
  		start_price: this.startPrice,
  		end_price: this.endPrice,
  		start_height: this.startHeight,
		end_height: this.endHeight,
		start_width: this.startWidth,
		end_width: this.endWidth,
		start_length: this.startLength,
		end_length: this.endLength,
		start_deposit: this.startDeposit,
		end_deposit: this.endDeposit,
		start_minterm: this.startMin_term,
		end_minterm: this.endMin_term,
		town: this.town,
		term: this.term,
		selected_banks: this.checkedBanks
  	}
  	this.paramsUpdated.emit(params);
  }

  searchBoxes(){
  	this.toggleSidebar();
  	this.search.emit();
  }

}