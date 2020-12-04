import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDetailPage } from './tour-detail.page';

describe('TourDetailPage', () => {
  let component: TourDetailPage;
  let fixture: ComponentFixture<TourDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TourDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TourDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
