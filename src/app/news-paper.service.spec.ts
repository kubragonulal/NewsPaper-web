import { TestBed } from '@angular/core/testing';

import { NewsPaperService } from './news-paper.service';

describe('NewsPaperService', () => {
  let service: NewsPaperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsPaperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
