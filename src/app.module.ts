import { createKeyv, Keyv } from '@keyv/redis'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { CacheableMemory } from 'cacheable'
import appConfig from './app.config'
import { AppController } from './app.controller'
import { BotModule } from './bot/bot.module'
import { CompanyModule } from './company/company.module'

@Module({
  imports: [
    BotModule,
    CompanyModule,
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: [
          new Keyv({
            store: new CacheableMemory({
              ttl: 1000 * 60 * 60,
              lruSize: 5000,
            }),
          }),
          createKeyv(configService.get('app.redis.host')),
        ],
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
