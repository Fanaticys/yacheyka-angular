import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { adminRouteAnimation, adminTableAnimation } from "../admin.animation";
import { BoxesService } from '../../_services/boxes.service';
import { ComponentService } from "../../_services/component.service";

@Component({
  selector: 'app-adm-table',
  templateUrl: './adm-table.component.html',
  styleUrls: ['./adm-table.component.sass'],
  animations: [ 
    adminRouteAnimation,
    adminTableAnimation
  ]
})
export class AdmTableComponent implements OnInit {
  @HostBinding('@adminRouteAnimation') animation;
  constructor(
    public boxesService: BoxesService,
    private componentService: ComponentService
  ) { }

  public showConfig: boolean = false;
  public rows:Array<any> = [];
  public columns:Array<any> = [
    {title: 'Размер', name: 'size', className: '', show: true, config: true},
    {title: 'Высота', name: 'height', className: 'height', show: false, config: true, sort: true},
    {title: 'Ширина', name: 'width', className: 'width', show: false, config: true, sort: true},
    {title: 'Глубина', name: 'length', className: 'length', show: false, config: true, sort: true},
    {title: 'Цена', name: 'price', className: 'price', show: true, sort: true},
    {title: 'Банк', name: 'bank', className: 'bank', show: true, sort: true},
    {title: 'Адрес', name: 'address', className: 'address', show: true, config: true, sort: true},
    {title: 'Город', name: 'town', className: 'town', show: true, config: true, sort: true},
    {title: 'Залог', name: 'deposit', className: 'deposit', show: false, config: true, sort: true},
    {title: 'Строк', name: 'min_term', className: 'min_term', show: false, config: true, sort: true}
  ];
  public page:number = 1;
  public itemsPerPage:number = 10;
  public maxSize:number = 3;
  public numPages:number = 1;
  public length:number = 0;
  public nextText:string = "&rsaquo;"; 
  public firstText:string = "&laquo;";
  public lastText:string = "&raquo;";
  public previousText:string = "&lsaquo;";
  public sort = {columnName: 'bank', sortName: 'asc'};
  public config:any = {
    paging: true,
    filtering: {filterString: ''}
  };
  public modalBox = {};
  public copyModalBox = {};
  public get _columns(){
    return this.columns.filter( (column) => {
      return column.show;
    });
  };
  public get _configs(){
    return this.columns.filter((column) => {
      return column.config;
    });
  };

  loading: boolean;
  data:Array<any> = [];

  searchBoxes(){
    this.loading = true;
    return this.boxesService.searchBoxes({}).subscribe(boxes => {
      this.data = boxes;
      this.loading = false;
      this.length = this.data.length;
      this.onChangeTable(this.config);
    });
  }

  public ngOnInit():void {
    this.searchBoxes();    
  }
  
  public ngOnChanges(){
    this.onChangeTable(this.config);
    this.length = this.data.length;
  }

  public toggleConfig(){
    this.showConfig = !this.showConfig;
  }

  public toggleSort(column):void{
    if(!column.sort) return;
    if(this.sort.columnName === column.name){
      switch (this.sort.sortName){
        case 'asc':
          this.sort.sortName = 'desc';
          break;
        case 'desc':
          this.sort.sortName = '';
          break;
        default:
          this.sort.sortName = 'asc';
          break;
      }
    } else {
       this.sort.columnName = column.name;
       this.sort.sortName = 'asc';
    }
    this.onChangeTable(this.config);
  }

  public changePage(page:any, data:Array<any> = this.data):Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeFilter(data:any, config:any):any {
    let filteredData:Array<any> = data;
    this._columns.forEach((column:any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item:any) => {
          return item[column.name].match(column.filtering.filterString);
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item:any) =>
        item[config.filtering.columnName].match(this.config.filtering.filterString));
    }

    let tempArray:Array<any> = [];
    filteredData.forEach((item:any) => {
      let flag = false;
      this._columns.forEach((column:any) => {
        if (item[column.name].toString().match(this.config.filtering.filterString)) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;

    return filteredData;
  }

  public onChangeTable(config:any, page:any = {page: this.page, itemsPerPage: this.itemsPerPage}):any {
    this.page = 1;
    let filteredData = this.changeFilter(this.data, this.config);
    let sortedData = this.makeSorting(filteredData);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.length = sortedData.length;
  }

  countOfDelated = 0;
  public deleteBox(box){
    let flag = confirm("Вы действительно хотите удалить ячейку?");
    if(!flag) return false;
    return this.boxesService.deleteBox(box._id).subscribe(data => {
      let index = this.data.indexOf(box);
      let modulus = this.data.length % this.itemsPerPage;
      let page = Math.round(this.data.length / this.itemsPerPage);
      box.class = 'deleting';
      this.countOfDelated += 1; 
      setTimeout( () => {
        this.data.splice(index, 1);
        if(this.page == page + 1 && modulus == 1 ) this.page = page;
        this.onChangeTable(this.config);
      }, 300);      
    });
  }

  private makeSorting(data):any{
    return data.sort((previous:any, current:any) => {
      if (previous[this.sort.columnName] > current[this.sort.columnName]) {
        return this.sort.sortName === 'desc' ? -1 : 1;
      } else if (previous[this.sort.columnName] < current[this.sort.columnName]) {
        return this.sort.sortName === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public openUpdating(box){
    this.componentService.showModal(true);
    this.modalBox = box;
    Object.assign(this.copyModalBox, box);
  }

  public updateBox(){
    this.componentService.showModal(false);
    this.boxesService
      .updateBox(this.modalBox)
      .subscribe(
        data => this.componentService.showResultHandling('success', "Успешно изменено"),
        err => this.componentService.showResultHandling('error', JSON.stringify(err))
      )
  }

  public closeUpdating(){
    this.componentService.showModal(false);
    Object.assign(this.modalBox, this.copyModalBox);
  }
}
