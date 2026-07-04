import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneDetails } from './airplane-details';

describe('AirplaneDetails', () => {
  let component: AirplaneDetails;
  let fixture: ComponentFixture<AirplaneDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AirplaneDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
