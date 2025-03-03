import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { BotModule } from './bot/bot.module'
import { CompanyModule } from './company/company.module'

@Module({
  imports: [BotModule, CompanyModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
