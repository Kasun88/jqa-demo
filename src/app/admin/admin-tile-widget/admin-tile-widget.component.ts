import {
  Component, OnInit, OnChanges, forwardRef, Input, ViewChild, Renderer2, ElementRef,
  SimpleChanges
} from '@angular/core';
import {WidgetComponent, WidgetHandleDirective} from "ngx-dashboard";
import {AdminWidget} from "../modal/admin-widget";
import {AdminWidgetDataServiceService} from "../service/admin-widget-data-service.service";
const forwardReference = forwardRef(() => AdminTileWidgetComponent);
@Component({
  selector: 'app-admin-tile-widget',
  templateUrl: './admin-tile-widget.component.html',
  styleUrls: ['./admin-tile-widget.component.css'],
  providers: [{provide: WidgetComponent, useExisting: forwardReference}]
})

export class AdminTileWidgetComponent  extends WidgetComponent implements OnInit, OnChanges{

  @Input() public size: number[] = [2, 2];
  @Input() public widgetId: string;
  @Input() public widgetConfig: AdminWidget;
  @ViewChild(WidgetHandleDirective) protected _handle: WidgetHandleDirective;
  options: any = {};
  chart: any = {};
  errorMessage: any = '';

  constructor(ngEl: ElementRef, renderer: Renderer2,
              private adminWidgetDataServiceService : AdminWidgetDataServiceService) {
    super(ngEl, renderer);
  }

  ngOnInit() {
    this.chart.value = this.widgetConfig.response.result.aggregation.value;
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  editWidget(): void {

    this.adminWidgetDataServiceService.query(this.widgetConfig.endPointUrl, this.widgetConfig.query )
      .subscribe( (response) => {
          this.chart.value  = response.result.aggregation.value;
        },
        error => this.errorMessage = <any>error);
  }
}
