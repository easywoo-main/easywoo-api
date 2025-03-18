import { IExceptionHandler } from './index';
import { HttpStatus } from '@nestjs/common';

export class DatabaseExceptionHandler implements IExceptionHandler {
  supports(exception: unknown): boolean {
    return exception instanceof Error && exception.name.includes('QueryFailedError');
  }
  handle(exception: Error) {
    return {
      status: HttpStatus.BAD_REQUEST,
      message: exception.message,
      name: exception.name,
    };
  }
}
