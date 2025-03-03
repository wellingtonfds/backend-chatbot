import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { Prisma } from '@prisma/client'
import { PrimaClientNotFountException, PrimaClientUniqueFailedException } from '.'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const exceptionList = {
      P2002: () => new PrimaClientUniqueFailedException(),
      P2025: () => new PrimaClientNotFountException(),
    }
    if (exception.code in exceptionList) {
      const customException = exceptionList[exception.code]()
      return response.status(customException.getStatus()).json(customException.getResponse())
    }

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
      error: 'Internal Server Error',
    })
  }
}
