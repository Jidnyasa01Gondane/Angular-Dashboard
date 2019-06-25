import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertToJSONComponent } from './convert-to-json.component';

describe('ConvertToJSONComponent', () => {
  let component: ConvertToJSONComponent;
  let fixture: ComponentFixture<ConvertToJSONComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvertToJSONComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertToJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
