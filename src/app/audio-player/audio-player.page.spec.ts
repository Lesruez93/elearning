import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioPlayerPage } from './audio-player.page';

describe('AudioPlayerPage', () => {
  let component: AudioPlayerPage;
  let fixture: ComponentFixture<AudioPlayerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioPlayerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
