import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { FetchService } from '@/aliveMonitoring/fetch/fetch.service';

/**
 * 死活監視の定期実行
 *
 * {@link https://crontab.guru/examples.html Cron Examples}
 */

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);
  constructor(private readonly fetchService: FetchService) {}

  @Cron('*/5 * * * *')
  async scheduleForFetchAndNotification() {
    this.logger.debug('Started "check alive"');
    await this.fetchService.fetchAndNotification();
    this.logger.debug('Finished "check alive"');
  }
}
