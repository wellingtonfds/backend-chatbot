import { RedisChatMessageHistory } from '@langchain/community/stores/message/ioredis'
import { ChatOllama } from '@langchain/ollama'
import { Inject, Injectable } from '@nestjs/common'
import Redis from 'ioredis'
import { ConversationChain } from 'langchain/chains'
import { BufferMemory } from 'langchain/memory'
import { v4 as uuidv4 } from 'uuid'
import { ConversationDto } from './dto/conversation.dto'

@Injectable()
export class BotService {
  private llm: ChatOllama

  constructor(@Inject('REDIS_CLIENT') private redisClient: Redis) {
    this.llm = new ChatOllama({
      model: 'llama3.2',
      temperature: 0,
      maxRetries: 3,
      streaming: false,
    })
  }

  async ask({ threadId, question }: ConversationDto): Promise<any> {
    const thread_id = threadId ?? uuidv4()
    const memory = new BufferMemory({
      chatHistory: new RedisChatMessageHistory({
        sessionId: thread_id,
        sessionTTL: 300,
        client: this.redisClient,
      }),
    })
    const chain = new ConversationChain({
      llm: this.llm,
      memory,
    })
    const response = await chain.invoke({ input: question })
    return response.response
  }
}
