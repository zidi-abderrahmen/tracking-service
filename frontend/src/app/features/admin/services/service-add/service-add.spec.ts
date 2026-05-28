import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceAdd } from './service-add';

describe('ServiceAdd', () => {
  let component: ServiceAdd;
  let fixture: ComponentFixture<ServiceAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
