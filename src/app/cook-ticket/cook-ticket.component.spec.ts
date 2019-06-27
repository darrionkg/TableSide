import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookTicketComponent } from './cook-ticket.component';

describe('CookTicketComponent', () => {
  let component: CookTicketComponent;
  let fixture: ComponentFixture<CookTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
