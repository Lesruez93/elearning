import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocViewerPage } from './doc-viewer.page';

describe('DocViewerPage', () => {
  let component: DocViewerPage;
  let fixture: ComponentFixture<DocViewerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocViewerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
