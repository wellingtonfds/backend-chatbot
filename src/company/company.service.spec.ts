import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { CompanyEntity } from './company.entity'
import { CompanyService } from './company.service'
import { CompanyRepository } from './repository/company.repository'

describe('CompanyService', () => {
  let service: CompanyService
  let mockService: DeepMockProxy<CompanyEntity>

  beforeEach(async () => {
    mockService = mockDeep<CompanyEntity>()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CompanyEntity,
          useValue: mockService,
        },
        CompanyRepository,
        CompanyService,
      ],
    }).compile()

    service = module.get<CompanyService>(CompanyService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a company', async () => {
    const data = {
      name: 'Company Name',
    }
    const createdData = {
      id: '1',
      name: data.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockService.company.create.mockResolvedValue(createdData)
    const result = await service.create(data)
    expect(result).toEqual(createdData)
  })

  it('should find a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockService.company.findFirstOrThrow.mockResolvedValue(data)
    const result = await service.findOne(data.id)
    expect(result).toEqual(data)

    mockService.company.findFirstOrThrow.mockRestore()
  })

  it('should update a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockService.company.update.mockResolvedValue(data)

    const result = await service.update(data.id, data)
    expect(result).toEqual(data)
  })

  it('should remove a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockService.company.delete.mockResolvedValue(data)

    const result = await service.remove(data.id)
    expect(result).toEqual(data)
  })
})
