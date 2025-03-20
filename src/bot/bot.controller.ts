import { Body, Controller, Post } from '@nestjs/common'
import { BotService } from './bot.service'
import { ConversationDto } from './dto/conversation.dto'

@Controller('bot')
export class BotController {
  constructor(private llm: BotService) {}

  @Post()
  getBot(@Body() conversationDto: ConversationDto) {
    return this.llm.ask(conversationDto)
  }
}
