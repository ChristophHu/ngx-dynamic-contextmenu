import { TestBed } from '@angular/core/testing';

import { NgxDynamicContextmenuService } from './ngx-dynamic-contextmenu.service';

describe('NgxDynamicContextmenuService', () => {
  let service: NgxDynamicContextmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDynamicContextmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
