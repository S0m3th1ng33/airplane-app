import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAirplaneForm } from './new-airplane-form';

describe('NewAirplaneForm', () => {
  let component: NewAirplaneForm;
  let fixture: ComponentFixture<NewAirplaneForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewAirplaneForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NewAirplaneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
