import { BadRequestException } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export class PrimaClientUniqueFailedException extends BadRequestException {
  @ApiProperty()
  public statusCode: string = '400'

  @ApiProperty()
  public message: string = 'Unique constraint failed on the database'

  @ApiProperty()
  public error: string = 'UNIQUE_CONSTRAINT_FAILED'

  constructor() {
    super('Unique constraint failed on the database', 'UNIQUE_CONSTRAINT_FAILED')
  }
}
