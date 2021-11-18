import { TestBed } from '@angular/core/testing';

import { ContentRepoService } from './content-repo.service';

describe('ContentRepoService', () => {
  let service: ContentRepoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentRepoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
