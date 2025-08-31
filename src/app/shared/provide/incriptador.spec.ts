import { TestBed } from '@angular/core/testing';

import { Incriptador } from './incriptador';

describe('Incriptador', () => {
  let service: Incriptador;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Incriptador);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
