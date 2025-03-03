import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Company } from '@prisma/client'
import { plainToClass } from 'class-transformer'
import { map, Observable } from 'rxjs'
import { ResponseCreateCompanyDto } from '../dto/response-create-company.dto'

export class CompanyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseCreateCompanyDto> {
    return next.handle().pipe(
      map((data: Company): ResponseCreateCompanyDto => {
        return plainToClass(ResponseCreateCompanyDto, data, {
          excludeExtraneousValues: true,
          exposeUnsetFields: false,
        })
      }),
    )
  }
}
