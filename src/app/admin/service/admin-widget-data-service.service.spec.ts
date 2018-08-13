import { TestBed, inject } from '@angular/core/testing';

import { AdminWidgetDataServiceService } from './admin-widget-data-service.service';

describe('AdminWidgetDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminWidgetDataServiceService]
    });
  });

  it('should be created', inject([AdminWidgetDataServiceService], (service: AdminWidgetDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
