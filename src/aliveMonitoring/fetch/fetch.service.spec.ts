import { Test, TestingModule } from '@nestjs/testing';

import { FetchService } from '@/aliveMonitoring/fetch/fetch.service';

describe('FetchService', () => {
  let service: FetchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchService],
    }).compile();

    service = module.get<FetchService>(FetchService);
  });

  xit('should be defined', () => {
    expect(service).toBeDefined();
  });
});
