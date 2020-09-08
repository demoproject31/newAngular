import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpanalComponent } from './adminpanal.component';

describe('AdminpanalComponent', () => {
  let component: AdminpanalComponent;
  let fixture: ComponentFixture<AdminpanalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminpanalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
