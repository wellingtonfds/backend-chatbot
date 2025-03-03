import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger'
import { PrimaClientUniqueFailedException } from '../exceptions/primas-client-unique-failed.exception'
import { CompanyService } from './company.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { ResponseCreateCompanyDto } from './dto/response-create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { CompanyInterceptor } from './serialize/company-interceptor'

@ApiNotFoundResponse({
  description: 'Company not found',
  type: PrimaClientUniqueFailedException,
  examples: {
    'Unique constraint failed on the database': {
      summary: 'Unique constraint failed on the database',
      value: {
        statusCode: 404,
        message: 'Company not found',
        error: 'NOT_FOUND',
      },
    },
  },
})
@UseInterceptors(CompanyInterceptor)
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseInterceptors(CompanyInterceptor)
  @ApiCreatedResponse({
    description: 'The record has been successfully created',
    type: ResponseCreateCompanyDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    type: PrimaClientUniqueFailedException,
    examples: {
      'Unique constraint failed on the database': {
        summary: 'Unique constraint failed on the database',
        value: {
          statusCode: 400,
          message: 'Unique constraint failed on the database',
          error: 'UNIQUE_CONSTRAINT_FAILED',
        },
      },
    },
  })
  @Post()
  public create(@Body() createCompanyDto: CreateCompanyDto): Promise<ResponseCreateCompanyDto> {
    return this.companyService.create(createCompanyDto)
  }

  @ApiOkResponse({
    description: 'Company has been successfully retrieved',
    type: ResponseCreateCompanyDto,
  })
  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.companyService.findOne(id)
  }

  @ApiOkResponse({
    description: 'Company has been successfully updated',
    type: ResponseCreateCompanyDto,
  })
  @Patch(':id')
  @ApiBody({
    type: UpdateCompanyDto,
  })
  public update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<ResponseCreateCompanyDto> {
    return this.companyService.update(id, updateCompanyDto)
  }
  @ApiOkResponse({
    description: 'Company has been successfully removed',
    type: ResponseCreateCompanyDto,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id)
  }
}
