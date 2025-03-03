import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class ResponseCreateCompanyDto {
  @Expose()
  @ApiProperty()
  public id: string

  @Expose()
  @ApiProperty()
  public name: string

  @Expose()
  @ApiProperty()
  public createdAt: Date

  @Expose()
  @ApiProperty()
  public updatedAt: Date
}
