import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService } from "./sidebar.service";

@Component({
	selector: 'sidebar',
	templateUrl: 'sidebar.component.html',
	styleUrls: ['sidebar.component.sass'],
	providers: [SidebarService]
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
	public towns;
	public town = "";
	public term = 'price_per_day';
	public banks;
	@Output() search = new EventEmitter();
	public get checkedBanks(){
		return this.banks
					.filter(bank => bank.checked)
					.map(bank => bank.value);
	}
	
	constructor(private sidebarService: SidebarService){
		this.getRangeValues();
		this.sidebarService.getBanks().subscribe(data => this.banks = data);
		this.sidebarService.getTowns().subscribe(data => this.towns = data);
	}

	ngOnInit(){ }

	private getRangeValues(){
		this.sidebarService.getRangeValues().subscribe(data => {
			this.rangeValues = data;
			this.setRangeValues();
			this.showSlider = true;
		});
	}

	private setRangeValues(){
		this.priceRange = [this.rangeValues.minPrice, this.rangeValues.maxPrice];
		this.heightRange = [this.rangeValues.minHeight, this.rangeValues.maxHeight];
		this.widthRange = [this.rangeValues.minWidth, this.rangeValues.maxWidth];
		this.lengthRange = [this.rangeValues.minLength, this.rangeValues.maxLength];
		this.depositRange = [this.rangeValues.minDeposit, this.rangeValues.maxDeposit];
		this.min_termRange = [this.rangeValues.minMinTerm, this.rangeValues.maxMinTerm];
	}

	toggleSidebar(){
		this.show = !this.show;
	}

	changeRange() {
		this.priceRange = [this.priceRange[0], this.priceRange[1]];
		this.heightRange = [this.heightRange[0], this.heightRange[1]];
		this.widthRange = [this.widthRange[0], this.widthRange[1]];
		this.lengthRange = [this.lengthRange[0], this.lengthRange[1]];
		this.depositRange = [this.depositRange[0], this.depositRange[1]];
		this.min_termRange = [this.min_termRange[0], this.min_termRange[1]];
	}

  	searchBoxes(){
		this.toggleSidebar();
		this.search.emit({
			start_price: this.priceRange[0],
			end_price: this.priceRange[1],
			start_height: this.heightRange[0],
			end_height: this.heightRange[1],
			start_width: this.widthRange[0],
			end_width: this.widthRange[1],
			start_length: this.lengthRange[0],
			end_length: this.lengthRange[1],
			start_deposit: this.depositRange[0],
			end_deposit: this.depositRange[1],
			start_minterm: this.min_termRange[0],
			end_minterm: this.min_termRange[1],
			town: this.town,
			term: this.term,
			selected_banks: this.checkedBanks
		});
  	}
}