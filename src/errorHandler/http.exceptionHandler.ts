import { HttpException } from '@nestjs/common';
import { IExceptionHandler } from './index';

export class HttpExceptionHandler implements IExceptionHandler {
  supports(exception: unknown): boolean {
    return exception instanceof HttpException;
  }

  handle(exception: HttpException) {
    const status = exception.getStatus();
    const res = exception.getResponse();
    let name = exception.name;

    return { ...(res as any), name, status };
  }
}
