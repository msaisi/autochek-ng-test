import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MakesService } from './makes.service';

describe('MakesService', () => {
  let service: MakesService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MakesService);
  });

  it('should be created to consume makes API to get popular brands/ makes', () => {
    expect(service).toBeTruthy();
  });
});
