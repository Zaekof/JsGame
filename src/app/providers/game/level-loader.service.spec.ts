import { TestBed } from '@angular/core/testing';

import { LevelLoaderService } from './level-loader.service';

describe('LevelLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelLoaderService = TestBed.get(LevelLoaderService);
    expect(service).toBeTruthy();
  });
});
