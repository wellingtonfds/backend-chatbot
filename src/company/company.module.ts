import { Module } from '@nestjs/common'
import { CompanyController } from './company.controller'
import { CompanyEntity } from './company.entity'
import { CompanyService } from './company.service'
import { CompanyRepository } from './repository/company.repository'

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, CompanyEntity, CompanyRepository],
})
export class CompanyModule {}
