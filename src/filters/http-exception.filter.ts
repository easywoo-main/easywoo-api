import { ErrorResponse } from 'src/errorHandler/errorResponse.dto';
import { IExceptionFilter } from './exception-filter';
import { Catch, HttpException } from '@nestjs/common';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';
//todo: rewrite filters
@Catch(HttpException)
export class HttpExceptionFilter extends IExceptionFilter {
    handle(exception: HttpException): Promise<ErrorResponse> {
        throw new Error('Method not implemented.');
      // const status = exception.getStatus();
      // const { error, statusCode,   ...data } = exception.getResponse() as HttpExceptionBody;
      // let name = exception.name;
      //
      // return { ...data, status };

    }
}