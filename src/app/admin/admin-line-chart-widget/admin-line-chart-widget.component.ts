import {
  Component, OnInit, forwardRef, OnChanges, ViewChild, Input, Renderer2, ElementRef,
  SimpleChanges
} from '@angular/core';
import {WidgetComponent, WidgetHandleDirective} from "ngx-dashboard";
import {AdminWidget} from "../modal/admin-widget";
import {AdminWidgetDataServiceService} from "../service/admin-widget-data-service.service";
const forwardReference = forwardRef(() => AdminLineChartWidgetComponent);
@Component({
  selector: 'app-admin-line-chart-widget',
  templateUrl: './admin-line-chart-widget.component.html',
  styleUrls: ['./admin-line-chart-widget.component.css'],
  providers: [{provide: WidgetComponent, useExisting: forwardReference}]
})
export class AdminLineChartWidgetComponent extends WidgetComponent implements OnInit, OnChanges {



  @Input() public size: number[] = [2, 1];
  @Input() public widgetId: string;
  @Input() public widgetConfig: AdminWidget;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;

  options: any;
  chart: any;
  errorMessage = '';
  maxPointsInXAxis = 10;

  constructor(ngEl: ElementRef, renderer: Renderer2,
              private adminWidgetDataServiceService : AdminWidgetDataServiceService) {
    super(ngEl, renderer);
  }


  ngOnInit() {

    this.options = {
      chart: {
        type: 'line'
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

  editWidget(): void {
    this.adminWidgetDataServiceService.query(this.widgetConfig.endPointUrl, this.widgetConfig.query )
      .subscribe( (response) => {
          this.options = {
            chart: {
              type: 'line'
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

  ngOnChanges(changes: SimpleChanges): void {
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
    console.log(this.widgetId);
  }

  saveChart(chart) {
    this.chart = chart;
    let series = this.chart.series[0];

  }

}
