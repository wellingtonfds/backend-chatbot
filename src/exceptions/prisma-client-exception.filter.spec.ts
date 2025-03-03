import { ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Prisma } from '@prisma/client'
import { PrimaClientNotFountException, PrimaClientUniqueFailedException } from '.'
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter'

describe('PrismaClientExceptionFilter', () => {
  let filter: PrismaClientExceptionFilter
  let host: ArgumentsHost

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaClientExceptionFilter],
    }).compile()

    filter = module.get<PrismaClientExceptionFilter>(PrismaClientExceptionFilter)
    host = createMockArgumentsHost()
  })

  it('should be defined', () => {
    expect(filter).toBeDefined()
  })

  it('should catch P2002 error and throw PrimaClientUniqueFailedException', () => {
    const exception = new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
      code: 'P2002',
      clientVersion: 'client-version',
    })

    const expectException = new PrimaClientUniqueFailedException()
    const responseException = expectException.getResponse()
    const response = host.switchToHttp().getResponse()
    const statusSpy = jest.spyOn(response, 'status')
    const jsonSpy = jest.spyOn(response, 'json')

    filter.catch(exception, host)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST)
    expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining(responseException))
  })

  it('should catch P2025 error and throw PrimaClientNotFountException', () => {
    const exception = new Prisma.PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: 'client-version',
    })
    const expectException = new PrimaClientNotFountException()
    const responseException = expectException.getResponse()
    const response = host.switchToHttp().getResponse()
    const statusSpy = jest.spyOn(response, 'status')
    const jsonSpy = jest.spyOn(response, 'json')

    filter.catch(exception, host)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatus.NOT_FOUND)
    expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining(responseException))
  })

  it('should catch other errors and return internal server error', () => {
    const exception = new Prisma.PrismaClientKnownRequestError('Internal server Error', {
      code: 'P9999',
      clientVersion: 'client-version',
    })

    const response = host.switchToHttp().getResponse()
    const statusSpy = jest.spyOn(response, 'status')
    const jsonSpy = jest.spyOn(response, 'json')

    filter.catch(exception, host)

    expect(statusSpy).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR)
    expect(jsonSpy).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: 'Internal Server Error',
    })
  })
})

function createMockArgumentsHost(): ArgumentsHost {
  return {
    switchToHttp: jest.fn().mockReturnThis(),
    getResponse: jest.fn().mockReturnValue({
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      headersSent: false, // Add this line to mock headersSent
    }),
    getRequest: jest.fn().mockReturnValue({ url: '/test' }),
    getNext: jest.fn().mockReturnValue({}),
    getType: jest.fn(),
    switchToRpc: jest.fn().mockReturnThis(),
    switchToWs: jest.fn().mockReturnThis(),
    getArgByIndex: jest.fn(),
  } as unknown as ArgumentsHost
}
