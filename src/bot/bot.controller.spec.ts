import { Test, TestingModule } from '@nestjs/testing'
import Redis from 'ioredis'
import { DeepMockProxy } from 'jest-mock-extended'
import { BotController } from './bot.controller'
import { BotService } from './bot.service'

describe('BotController', () => {
  let controller: BotController
  let redisClientMock: DeepMockProxy<Redis>
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotController],
      providers: [
        BotService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisClientMock,
        },
      ],
    }).compile()

    controller = module.get<BotController>(BotController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
