import { TestBed } from '@angular/core/testing';

import { GetterSetterService } from './getter-setter.service';

describe('GetterSetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetterSetterService = TestBed.get(GetterSetterService);
    expect(service).toBeTruthy();
  });
});
