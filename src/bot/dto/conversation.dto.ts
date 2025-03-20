import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class ConversationDto {
  @ApiProperty()
  @IsString()
  question: string

  @ApiProperty()
  @IsString()
  threadId: string
}
