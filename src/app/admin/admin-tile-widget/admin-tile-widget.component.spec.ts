import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTileWidgetComponent } from './admin-tile-widget.component';

describe('AdminTileWidgetComponent', () => {
  let component: AdminTileWidgetComponent;
  let fixture: ComponentFixture<AdminTileWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTileWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTileWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
