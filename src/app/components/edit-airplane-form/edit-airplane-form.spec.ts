import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAirplaneForm } from './edit-airplane-form';

describe('EditAirplaneForm', () => {
  let component: EditAirplaneForm;
  let fixture: ComponentFixture<EditAirplaneForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAirplaneForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAirplaneForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
