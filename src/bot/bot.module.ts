import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import Redis from 'ioredis'
import { BotController } from './bot.controller'
import { BotService } from './bot.service'

@Module({
  controllers: [BotController],
  imports: [ConfigModule],
  providers: [
    BotService,
    {
      inject: [ConfigService],
      provide: 'REDIS_CLIENT',
      useFactory: (config: ConfigService) => new Redis(config.get('app.redis.host')),
    },
  ],
})
export class BotModule {}
