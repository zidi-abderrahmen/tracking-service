import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetAdd } from './timesheet-add';

describe('TimesheetAdd', () => {
  let component: TimesheetAdd;
  let fixture: ComponentFixture<TimesheetAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
