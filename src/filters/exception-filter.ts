import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { ErrorResponse } from '../errorHandler/errorResponse.dto';
import { Response } from 'express';

export abstract class IExceptionFilter<T = unknown> implements ExceptionFilter {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  async catch(exception: T, host: ArgumentsHost): Promise<void> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(`Exception: ${exception}`, exception);

    const handledException = await this.handle(exception);

    response.status(handledException.statusCode).json({
      ...handledException,
      timestamp: new Date().toISOString()
    });
  }

  abstract handle(exception: T): Promise<ErrorResponse>;
}
