import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDynamicContextmenuComponent } from './ngx-dynamic-contextmenu.component';

describe('NgxDynamicContextmenuComponent', () => {
  let component: NgxDynamicContextmenuComponent;
  let fixture: ComponentFixture<NgxDynamicContextmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxDynamicContextmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxDynamicContextmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
