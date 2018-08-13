import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBarChartWidgetComponent } from './admin-bar-chart-widget.component';

describe('AdminBarChartWidgetComponent', () => {
  let component: AdminBarChartWidgetComponent;
  let fixture: ComponentFixture<AdminBarChartWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBarChartWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBarChartWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
