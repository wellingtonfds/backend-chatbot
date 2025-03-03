import { CallHandler, ExecutionContext } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { firstValueFrom, of } from 'rxjs'
import { ResponseCreateCompanyDto } from '../dto/response-create-company.dto'
import { CompanyInterceptor } from './company-interceptor'

describe('CompanyInterceptor', () => {
  let interceptor: CompanyInterceptor
  let executionContext: ExecutionContext
  let callHandler: CallHandler
  const dateNow = new Date()
  beforeEach(() => {
    interceptor = new CompanyInterceptor()
    executionContext = {} as ExecutionContext
    callHandler = {
      handle: jest.fn().mockReturnValue(
        of({
          id: '1',
          name: 'Test Company',
          createdAt: dateNow,
          updatedAt: dateNow,
        }),
      ),
    }
  })

  it('should be defined', () => {
    expect(interceptor).toBeDefined()
  })

  it('should transform Company to ResponseCreateCompanyDto', async () => {
    const result = await firstValueFrom(interceptor.intercept(executionContext, callHandler))

    const expectedResponse = plainToClass(
      ResponseCreateCompanyDto,
      {
        id: '1',
        name: 'Test Company',
        createdAt: dateNow,
        updatedAt: dateNow,
      },
      {
        excludeExtraneousValues: true,
        exposeUnsetFields: false,
      },
    )

    expect(result).toEqual(expectedResponse)
  })
})
