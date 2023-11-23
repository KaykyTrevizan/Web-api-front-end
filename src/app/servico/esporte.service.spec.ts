import { TestBed } from '@angular/core/testing';

import { EsporteService } from './esporte.service';

describe('EsporteService', () => {
  let service: EsporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
