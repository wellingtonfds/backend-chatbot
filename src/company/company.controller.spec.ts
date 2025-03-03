import { Test, TestingModule } from '@nestjs/testing'
import { MockProxy, mock } from 'jest-mock-extended'

import { PrimaClientNotFountException, PrimaClientUniqueFailedException } from '../exceptions'
import { CompanyController } from './company.controller'
import { CompanyEntity } from './company.entity'
import { CompanyService } from './company.service'

describe('CompanyController', () => {
  let controller: CompanyController
  let companyServiceMock: MockProxy<CompanyService>

  beforeEach(async () => {
    companyServiceMock = mock<CompanyService>()
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: companyServiceMock,
        },
        CompanyEntity,
      ],
    }).compile()

    controller = module.get<CompanyController>(CompanyController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should create a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.create.mockResolvedValue(data)
    const result = await controller.create(data)
    expect(companyServiceMock.create).toHaveBeenCalledWith(data)
    expect(result).toEqual(data)
  })

  it('should find a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.findOne.mockResolvedValue(data)
    const result = await controller.findOne(data.id)
    expect(companyServiceMock.findOne).toHaveBeenCalledWith(data.id)
    expect(result).toEqual(data)
  })

  it('should update a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.update.mockResolvedValue(data)
    const result = await controller.update(data.id, data)
    expect(companyServiceMock.update).toHaveBeenCalledWith(data.id, data)
    expect(result).toEqual(data)
  })

  it('should remove a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.remove.mockResolvedValue(data)
    const result = await controller.remove(data.id)
    expect(companyServiceMock.remove).toHaveBeenCalledWith(data.id)
    expect(result).toEqual(data)
  })

  it('should not unique name company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.findOne.mockRejectedValue(new PrimaClientUniqueFailedException())
    await expect(controller.findOne(data.id)).rejects.toThrow(PrimaClientUniqueFailedException)
    expect(companyServiceMock.findOne).toHaveBeenCalledWith(data.id)
  })

  it('should not find a company', async () => {
    const data = {
      id: '1',
      name: 'Company Name',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    companyServiceMock.findOne.mockRejectedValue(new PrimaClientNotFountException())
    await expect(controller.findOne(data.id)).rejects.toThrow(PrimaClientNotFountException)
    expect(companyServiceMock.findOne).toHaveBeenCalledWith(data.id)
  })
})
