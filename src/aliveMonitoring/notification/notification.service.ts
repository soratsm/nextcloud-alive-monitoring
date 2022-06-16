import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

/**
 *  LINE Notify に通知
 *
 * {@link https://notify-bot.line.me/doc/ja/ LINE Notify API Document}
 */
@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  async notifyAdministrator(): Promise<void> {
    this.logger.debug('Started "notify administrator"');

    const LINE_NOTIFY_API_URL = 'https://notify-api.line.me/api/notify';
    const MESSAGE = `障害発生:${process.env.NEXTCLOUD_URL}`;

    // アクセストークンのカンマ区切りを配列化
    const tokens = process.env.LINE_TOKENS.split(',');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const FormData = require('form-data');

    tokens.map(async (token) => {
      const formData = new FormData();
      formData.append('message', MESSAGE);
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      await axios.post(LINE_NOTIFY_API_URL, formData, { headers });
    });

    this.logger.debug('Finished "notify administrator"');
  }
}
