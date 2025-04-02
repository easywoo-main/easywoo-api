import { IExceptionHandler } from './index';
import { HttpStatus } from '@nestjs/common';

export class DefaultExceptionHandler implements IExceptionHandler {
  supports(exception: unknown): boolean {
    return exception instanceof Error;
  }

  handle(exception: Error) {
    console.log(exception);
    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message || 'Internal server error',
      name: exception.name || 'Error',
      additionalInfo: undefined,
    };
  }
}
