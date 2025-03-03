import { Test, TestingModule } from '@nestjs/testing'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { CompanyEntity } from '../company.entity'
import { CompanyRepository } from './company.repository'

describe('CompanyEntity', () => {
  let service: CompanyRepository
  let companyEntityMock: DeepMockProxy<CompanyEntity>
  beforeEach(async () => {
    companyEntityMock = mockDeep<CompanyEntity>()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyRepository,
        {
          provide: CompanyEntity,
          useValue: companyEntityMock,
        },
      ],
    }).compile()
    service = module.get<CompanyRepository>(CompanyRepository)
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
    companyEntityMock.company.create.mockResolvedValue(createdData)
    const result = await service.create(data)
    expect(result).toEqual(createdData)
    companyEntityMock.company.create.mockRestore()
  })

  it('should find a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyEntityMock.company.findFirstOrThrow.mockResolvedValue(data)
    const result = await service.findOne(data.id)
    expect(result).toEqual(data)
    companyEntityMock.company.findFirstOrThrow.mockRestore()
  })

  it('should update a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    const updatedData = {
      ...data,
      name: 'New Company Name',
    }
    companyEntityMock.company.update.mockResolvedValue(updatedData)
    const result = await service.update(data.id, { name: updatedData.name })
    expect(result).toEqual(updatedData)
    companyEntityMock.company.update.mockRestore()
  })

  it('should delete a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    companyEntityMock.company.delete.mockResolvedValue(data)
    const result = await service.delete(data.id)
    expect(result).toEqual(data)
    companyEntityMock.company.delete.mockRestore()
  })
})
