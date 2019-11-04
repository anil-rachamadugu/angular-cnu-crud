import { TestBed } from '@angular/core/testing';

import { DevtaskService } from './devtask.service';

describe('DevtaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DevtaskService = TestBed.get(DevtaskService);
    expect(service).toBeTruthy();
  });
});
