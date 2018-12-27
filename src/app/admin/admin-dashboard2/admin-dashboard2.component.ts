import {Component, OnInit, ViewChild, EventEmitter} from '@angular/core';
import {DashboardComponent, WidgetComponent} from 'ngx-dashboard';
import { LocalStorageService } from 'angular-2-local-storage';
import {AdminWidget} from '../modal/admin-widget';
import {AdminBarChartWidgetComponent} from '../admin-bar-chart-widget/admin-bar-chart-widget.component';
import {AdminLineChartWidgetComponent} from '../admin-line-chart-widget/admin-line-chart-widget.component';
import {AdminWidgetDataServiceService} from '../service/admin-widget-data-service.service';
import {AdminTileWidgetComponent} from '../admin-tile-widget/admin-tile-widget.component';
// Variable in assets/js/scripts.js file

declare var AdminLTE: any;

@Component({
  selector: 'app-admin-dashboard2',
  templateUrl: './admin-dashboard2.component.html',
  styleUrls: ['./admin-dashboard2.component.css'],
  host: {
    '(window:resize)': '_onResize($event)',
  }
})
export class AdminDashboard2Component implements OnInit {
  @ViewChild(DashboardComponent) dashboard: DashboardComponent;
  widgetsSize: number[] = [50, 50];
  dashboardMargin = 20;
  public widget: AdminWidget;
  public widgets: AdminWidget[] = [];
  errorMessage = '';
  constructor(private localStorageService: LocalStorageService,
  private adminWidgetDataServiceService: AdminWidgetDataServiceService) {
    this.widget = new AdminWidget();
  }

  ngOnInit() {
     // Actualiza la barra latera y el footer
    AdminLTE.init();
    this._onResize(null);
    let dahsboardData : any = this.localStorageService.get('dashboard2');
    if(dahsboardData){
      let widgetList = dahsboardData.widgets;
      if(widgetList.hasOwnProperty('length')){
        console.log(widgetList.length);
        for (let i = 0 ; i < widgetList.length; i++){
          console.log(widgetList[i]);
          this.addSavedWidgets(widgetList[i]);
        }
      }
      console.log(widgetList);
    }

    //console.log(this.widgets);
  }

  private _onResize(event: any) {
    if (window.innerWidth < 750) {
      this.dashboardMargin = 10;
      this.widgetsSize = [this.dashboard.width / 2 - this.dashboardMargin, this.widgetsSize[1]];
    }else {
      this.dashboardMargin = 10;
      const nbColumn = Math.floor(this.dashboard.width / (300 + this.dashboardMargin));
     // const nbColumn = 4;
      this.widgetsSize = [this.dashboard.width / nbColumn - this.dashboardMargin, this.widgetsSize[1]];
      console.log(this.widgetsSize);
    }
  }



  addWidget() {
    this.addSavedWidgets(this.widget);
  }

  addSavedWidgets(widget: AdminWidget){
    //TODO need to get the response to the query and pass it to the widget component. For now we will just hardcode some
    // sample response in the each widget component so that we can display the widgets.
    this.adminWidgetDataServiceService.query(widget.endPointUrl, widget.query )
      .subscribe( (response) => {
          console.log(response);
          widget.response = response;
          switch (widget.chartType){
            case 'barChart' :
              const newBarWidget : AdminBarChartWidgetComponent = this.dashboard.addItem(AdminBarChartWidgetComponent);
              newBarWidget.widgetId = Math.random() + '';
              newBarWidget.widgetConfig = widget;
              this.widgets.push(widget);
              break;
            case  'lineChart' :
              const newLineWidget : AdminLineChartWidgetComponent = this.dashboard.addItem(AdminLineChartWidgetComponent);
              newLineWidget.widgetId = Math.random() + '';
              newLineWidget.widgetConfig = widget;
              this.widgets.push(widget);
              break;
            case 'simpleTile':
              const newTileWidget : AdminTileWidgetComponent = this.dashboard.addItem(AdminTileWidgetComponent);
              newTileWidget.widgetId = Math.random() + '';
              newTileWidget.widgetConfig = widget;
              this.widgets.push(widget);
              break;
          }
        },
        error => this.errorMessage = <any>error);

  }

  updateWidget(event : any) : EventEmitter<AdminWidget>{
    console.log('test');
    return null;
  }
  close(e: any, id: string) {
    this.dashboard.removeItemById(id);
    e.preventDefault();
    e.stopPropagation();
  }

  log(widget: WidgetComponent, type: string) {
    console.log(widget, type);
  }

  logOrder(order: Array<string>) {
    console.log(order, 'orderchange');
  }

  saveDashboard() {
    let dashboardData = {
      dashboardName : 'name',
      widgets: this.widgets
    };
   let saved =  this.localStorageService.add('dashboard2', dashboardData);
   console.log('saved', saved);
  }

  test(){
    console.log(this.widget);
  }
}
