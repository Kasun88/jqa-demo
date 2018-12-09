import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { AdminDashboard1Component } from './admin-dashboard1/admin-dashboard1.component';
import { AdminControlSidebarComponent } from './admin-control-sidebar/admin-control-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import {ChartModule} from "angular2-highcharts";
import {NgDashboardModule} from "ngx-dashboard";
import { AdminSampleWidgetComponent } from './admin-sample-widget/admin-sample-widget.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { AdminAddWidgetComponent } from './admin-add-widget/admin-add-widget.component';
import {ModalModule} from "ng2-modal";
import { FormsModule } from '@angular/forms';
import { AdminBarChartWidgetComponent } from './admin-bar-chart-widget/admin-bar-chart-widget.component';
import { AdminLineChartWidgetComponent } from './admin-line-chart-widget/admin-line-chart-widget.component';
import { AdminTileWidgetComponent } from './admin-tile-widget/admin-tile-widget.component';
import { AdminWidgetDataServiceService } from './service/admin-widget-data-service.service';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts/highcharts';




@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgDashboardModule,
    ChartModule,
    LocalStorageModule.withConfig({
      prefix: 'big-data-dashboard',
      storageType: 'localStorage'
    }),
    ModalModule,
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminControlSidebarComponent,
    AdminDashboard1Component,
    AdminDashboard2Component,
    AdminSampleWidgetComponent,
    AdminAddWidgetComponent,
    AdminBarChartWidgetComponent,
    AdminLineChartWidgetComponent,
    AdminTileWidgetComponent
  ],
  exports: [AdminComponent],
  entryComponents: [
    AdminSampleWidgetComponent,
    AdminBarChartWidgetComponent,
    AdminLineChartWidgetComponent,
    AdminTileWidgetComponent
  ],
  providers: [
    AdminWidgetDataServiceService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})
export class AdminModule { }

export function highchartsFactory() {
  // Default options.
  highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  // Initialize addons.

  return highcharts;
}
