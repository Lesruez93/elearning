import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigningPage } from './signing.page';

describe('SigningPage', () => {
  let component: SigningPage;
  let fixture: ComponentFixture<SigningPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigningPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
