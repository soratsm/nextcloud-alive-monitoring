import { Test, TestingModule } from '@nestjs/testing';

import { NotificationService } from '@/aliveMonitoring/notification/notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationService],
    }).compile();

    service = module.get<NotificationService>(NotificationService);
  });

  xit('should be defined', () => {
    expect(service).toBeDefined();
  });
});
