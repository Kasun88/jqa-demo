import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLineChartWidgetComponent } from './admin-line-chart-widget.component';

describe('AdminLineChartWidgetComponent', () => {
  let component: AdminLineChartWidgetComponent;
  let fixture: ComponentFixture<AdminLineChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLineChartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLineChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
