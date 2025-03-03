import { Test, TestingModule } from '@nestjs/testing'
import { CompanyController } from './company.controller'
import { CompanyEntity } from './company.entity'
import { CompanyModule } from './company.module'
import { CompanyService } from './company.service'

describe('CompanyModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [CompanyModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })

  it('should resolve CompanyService', () => {
    const companyService = module.get<CompanyService>(CompanyService)
    expect(companyService).toBeDefined()
  })

  it('should resolve CompanyController', () => {
    const companyController = module.get<CompanyController>(CompanyController)
    expect(companyController).toBeDefined()
  })

  it('should resolve CompanyEntity', () => {
    const companyEntity = module.get<CompanyEntity>(CompanyEntity)
    expect(companyEntity).toBeDefined()
  })
})
