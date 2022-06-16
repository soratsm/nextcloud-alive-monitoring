import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AliveMonitoringModule } from '@/aliveMonitoring/aliveMonitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    ScheduleModule.forRoot(),
    AliveMonitoringModule,
  ],
  providers: [],
})
export class AppModule {}
