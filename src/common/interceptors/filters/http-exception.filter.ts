import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse: any =
            exception instanceof HttpException
                ? exception.getResponse()
                : { message: 'Internal server error' };

        let message = exceptionResponse.message || exceptionResponse;

        if (Array.isArray(message)) {
            message = message[0]; // For class-validator array of errors
        }

        response.status(status).json({
            statusCode: status,
            message: message,
            error: exceptionResponse.error || HttpStatus[status] || 'Error',
            timestamp: new Date().toISOString(),
            path: ctx.getRequest().url,
        });
    }
}
