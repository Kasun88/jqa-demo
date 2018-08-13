import {Component, OnInit, forwardRef, ViewChild, Input, Renderer2, ElementRef} from '@angular/core';
import {WidgetComponent, WidgetHandleDirective} from "ngx-dashboard";
const forwardReference = forwardRef(() => AdminSampleWidgetComponent);
@Component({
  selector: 'app-admin-sample-widget',
  templateUrl: './admin-sample-widget.component.html',
  styleUrls: ['./admin-sample-widget.component.css']
})

export class AdminSampleWidgetComponent extends WidgetComponent implements OnInit {

  @Input() public size: number[] = [1, 1];
  @Input() public widgetId: string;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;

  options: any;
  chart: any;
  maxPointsInXAxis = 10;

  sampleResponse : any = {
    result: {
      aggregation: {
        groups: {
          colombo: 10,
          kandy: 5,
          negombo: 12,
          maharagama: 2,
          nugegoda: 20
        }
      }
    }
  };


  constructor(ngEl: ElementRef, renderer: Renderer2) {
    super(ngEl, renderer);
    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Number of errors reported in two releases after deployments'
      },
      xAxis: {
        categories: [
        ],
        title: {
          text: 'Since start (Days)'
        }
      },
      yAxis: {
        title: {
          text: 'Errors reported (count)'
        }
      },
      series: [

      ]
    };
    this.generateOptions(this.sampleResponse);
  }

  ngOnInit() {
  }

  saveChart(chart) {
    this.chart = chart;
    let series = this.chart.series[0];
  }


  generateOptions(response:any) {
    this.options.series.push({
      name: "Test Data",
      data:[]
    });
    for(let property in response.result.aggregation.groups){
      this.options.xAxis.categories.push(property);
      this.options.series[0].data.push(response.result.aggregation.groups[property])
    }
  }

  addPoint() {
    //this.chart.series[0].addPoint((Math.random() * 50));
    //this.chart.series[1].addPoint(Math.random() * 10);

    let x = (new Date()).getTime(), // current time
      y = Math.random();
    this.chart.series[0].addPoint([x,y])

  }
  onPointSelect(point) {
    alert(`${point.y} is selected`);
  }
  onSeriesHide(series) {
    alert(`${series.name} is selected`);
  }


}
