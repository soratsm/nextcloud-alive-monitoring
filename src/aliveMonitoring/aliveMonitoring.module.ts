import { FetchService } from '@/aliveMonitoring/fetch/fetch.service';
import { NotificationService } from '@/aliveMonitoring/notification/notification.service';
import { ScheduleService } from '@/aliveMonitoring/schedule/schedule.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [NotificationService, FetchService, ScheduleService],
  imports: [],
  controllers: [],
})
export class AliveMonitoringModule {}
