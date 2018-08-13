import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSampleWidgetComponent } from './admin-sample-widget.component';

describe('AdminSampleWidgetComponent', () => {
  let component: AdminSampleWidgetComponent;
  let fixture: ComponentFixture<AdminSampleWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSampleWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSampleWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
