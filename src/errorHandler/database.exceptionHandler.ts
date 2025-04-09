import { IExceptionHandler } from './index';
import { HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

export class DatabaseExceptionHandler implements IExceptionHandler {
  supports(exception: unknown): boolean {
    return (
      exception instanceof Prisma.PrismaClientKnownRequestError ||
      exception instanceof Prisma.PrismaClientUnknownRequestError ||
      exception instanceof Prisma.PrismaClientValidationError ||
      exception instanceof Prisma.PrismaClientRustPanicError ||
      exception instanceof Prisma.PrismaClientInitializationError
    );
  }

  handle(exception: Prisma.PrismaClientKnownRequestError | Error) {
    let status = HttpStatus.BAD_REQUEST;
    let message = exception.message || 'Database error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2002':
          message = 'Duplicate entry: this value must be unique.';
          break;
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found.';
          break;
        case 'P2014':
          status = HttpStatus.CONFLICT;
          message = 'Invalid relation: the referenced record does not exist.';
          break;
        case 'P2016':
          status = HttpStatus.BAD_REQUEST;
          message = 'Invalid query structure.';
          break;
        case 'P2003':
          status = HttpStatus.CONFLICT;
          message = 'Foreign key constraint failed.';
          break;
      }
    }

    return { status, message, name: exception.name };
  }
}
