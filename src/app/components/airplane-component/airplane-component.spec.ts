import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirplaneComponent } from './airplane-component';

describe('AirplaneComponent', () => {
  let component: AirplaneComponent;
  let fixture: ComponentFixture<AirplaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AirplaneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AirplaneComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
