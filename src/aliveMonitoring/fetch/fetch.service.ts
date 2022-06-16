import { NotificationService } from '@/aliveMonitoring/notification/notification.service';
import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { StatusRes } from './interfaces/statusRes.interface';

/**
 * 『status.php』の取得可否による死活監視
 *
 * {@link https://docs.nextcloud.com/server/12/admin_manual/operations/considerations_on_monitoring.html#status-php Nextcloud 12 Server Administration Manual}
 */

@Injectable()
export class FetchService {
  private readonly logger = new Logger(FetchService.name);

  constructor(private readonly notificationService: NotificationService) {}

  async fetchAndNotification(): Promise<void> {
    this.logger.debug('Started "fetch status/php"');
    const url = `${process.env.NEXTCLOUD_URL}status.php`;

    await axios
      .get<StatusRes>(url)
      .then((res) => {
        if (
          'installed' in res.data &&
          'version' in res.data &&
          'versionstring' in res.data &&
          'edition' in res.data
        ) {
          this.logger.debug('Nextcloud is alive');
        } else {
          this.logger.debug('target is wrong');
          this.notificationService.notifyAdministrator();
        }
      })
      .catch(() => {
        this.logger.debug(`Unable to get target`);
        this.notificationService.notifyAdministrator();
      })
      .finally(() => {
        this.logger.debug('Finished "fetch status/php"');
      });
  }
}
