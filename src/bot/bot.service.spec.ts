import Redis from 'ioredis'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { BotService } from './bot.service'

describe('BotService', () => {
  let service: BotService
  let redisClientMock: DeepMockProxy<Redis>

  beforeEach(async () => {
    redisClientMock = mockDeep<Redis>()
    service = new BotService(redisClientMock)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
