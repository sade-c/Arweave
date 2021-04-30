import { TestBed } from '@angular/core/testing';

import { KatlamaResolverService } from './katlama-resolver.service';

describe('KatlamaResolverService', () => {
  let service: KatlamaResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KatlamaResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
