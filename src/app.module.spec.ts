import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppModule } from './app.module'
import { BotModule } from './bot/bot.module'
import { CompanyModule } from './company/company.module'

describe('AppModule', () => {
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })

  it('should have an appController', () => {
    const appController = module.get<AppController>(AppController)
    expect(appController).toBeDefined()
  })

  it('should have a botModule', () => {
    const botModule = module.get<BotModule>(BotModule)
    expect(botModule).toBeDefined()
  })

  it('should have a companyModule', () => {
    const companyModule = module.get<CompanyModule>(CompanyModule)
    expect(companyModule).toBeDefined()
  })
})
