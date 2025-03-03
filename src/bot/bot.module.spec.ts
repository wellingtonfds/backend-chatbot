import { Test, TestingModule } from '@nestjs/testing'
import { BotModule } from './bot.module'

describe('CompanyModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [BotModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })
})
