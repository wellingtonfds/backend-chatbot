import { NotFoundException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class PrimaClientNotFountException extends NotFoundException {
  @ApiProperty()
  public statusCode: string = '404'

  @ApiProperty()
  public message: string = 'Resource not found'

  @ApiProperty()
  public error: string = 'NOT_FOUND'

  constructor() {
    super('Resource not found', 'NOT_FOUND')
  }
}
