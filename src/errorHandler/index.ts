import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import {ErrorResponse} from "./errorResponse.dto";
import {HttpExceptionHandler} from "./http.exceptionHandler";
import {DefaultExceptionHandler} from "./default.exceptionHandler";
import {DatabaseExceptionHandler} from "./database.exceptionHandler";

export interface IExceptionHandler {
    supports(exception: unknown): boolean;
    handle(exception: unknown): {
        status: number;
        message: string;
        name: string;
        additionalInfo?: any;
    };
}

@Catch()
export class GlobalFilter implements ExceptionFilter {
    private handlers: IExceptionHandler[];

    constructor() {
        this.handlers = [
            new HttpExceptionHandler(),
            new DatabaseExceptionHandler(),
            new DefaultExceptionHandler(),
        ];
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx      = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request  = ctx.getRequest<Request>();

        const handler = this.handlers.find(h => h.supports(exception)) || new DefaultExceptionHandler();
        const { status, message, name, additionalInfo } = handler.handle(exception);

        const errorResponse: ErrorResponse = {
            path: request.url,
            statusCode: status,
            message,
            name,
            additionalInfo
        };

        response.status(status).json(
            {...errorResponse, timestamp: new Date().toISOString()}

        );
    }
}


export const globalFilter = new GlobalFilter();