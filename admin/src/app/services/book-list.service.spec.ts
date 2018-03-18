import { TestBed, inject } from '@angular/core/testing';

import { BookListService } from './book-list.service';

describe('BookListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookListService]
    });
  });

  it('should be created', inject([BookListService], (service: BookListService) => {
    expect(service).toBeTruthy();
  }));
});
