import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddWidgetComponent } from './admin-add-widget.component';

describe('AdminAddWidgetComponent', () => {
  let component: AdminAddWidgetComponent;
  let fixture: ComponentFixture<AdminAddWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
