import {
  Component, OnInit, ViewChild, Input, forwardRef, ElementRef, Renderer2, OnChanges,
  SimpleChanges, EventEmitter, Output
} from '@angular/core';
import {WidgetComponent, WidgetHandleDirective, DashboardComponent} from "ngx-dashboard";
import {AdminWidget} from "../modal/admin-widget";
import {AdminWidgetDataServiceService} from "../service/admin-widget-data-service.service";
const forwardReference = forwardRef(() => AdminBarChartWidgetComponent);
@Component({
  selector: 'app-admin-bar-chart-widget',
  templateUrl: './admin-bar-chart-widget.component.html',
  styleUrls: ['./admin-bar-chart-widget.component.css'],
  providers: [{provide: WidgetComponent, useExisting: forwardReference}]
})
export class AdminBarChartWidgetComponent extends WidgetComponent implements OnInit, OnChanges {

  @Input() public size: number[] = [1, 1];
  @Input() public widgetId: string;
  @Input() public widgetConfig: AdminWidget;
  @Output() widgetUpdated:EventEmitter<AdminWidget> = new EventEmitter();
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;
  options: any;
  chart: any;
  errorMessage = "";
  maxPointsInXAxis = 10;

  constructor(ngEl: ElementRef, renderer: Renderer2,
              private adminWidgetDataServiceService : AdminWidgetDataServiceService) {
    super(ngEl, renderer);
  }

  ngOnInit() {
    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: this.widgetConfig.name
      },
      xAxis: {
        categories: [
        ],
        title: {
          text: this.widgetConfig.xAxisLabel
        }
      },
      yAxis: {
        title: {
          text: this.widgetConfig.yAxisLabel
        }
      },
      series: [

      ]
    };
    this.generateOptions(this.widgetConfig.response);
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  editWidget(): void {
    //this.widgetUpdated.emit(this.widgetConfig);

    this.adminWidgetDataServiceService.query(this.widgetConfig.endPointUrl, this.widgetConfig.query )
      .subscribe( (response) => {
          this.options = {
            chart: {
              type: 'column'
            },
            title: {
              text: this.widgetConfig.name
            },
            xAxis: {
              categories: [
              ],
              title: {
                text: this.widgetConfig.xAxisLabel
              }
            },
            yAxis: {
              title: {
                text: this.widgetConfig.yAxisLabel
              }
            },
            series: [

            ]
          };
          this.generateOptions(response);

          this.chart.update(this.options, true, false);

          console.log('updated response');

        },
        error => this.errorMessage = <any>error);
  }

  generateOptions(response:any) {
    this.options.series.push({
      name: "",
      data:[]
    });
    for(let property in response.result.aggregation.groups){
      this.options.xAxis.categories.push(property);
      this.options.series[0].data.push(response.result.aggregation.groups[property])
    }
    console.log(this.options);
  }

  saveChart(chart) {
    this.chart = chart;
    let series = this.chart.series[0];

  }


}
