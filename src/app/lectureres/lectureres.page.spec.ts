import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureresPage } from './lectureres.page';

describe('LectureresPage', () => {
  let component: LectureresPage;
  let fixture: ComponentFixture<LectureresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
