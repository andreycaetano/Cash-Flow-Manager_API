import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class UserExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR
        
        let message = 'Internal Server Error';
        let field = null;

        if (exception instanceof QueryFailedError) {
            if (exception.driverError.code === '23505') {
                message = 'This value already exists. Please provide a unique value.';
                
                const match = exception.driverError.detail.match(/Key \(([^)]+)\)=\(([^)]+)\) already exists/);
                if (match) {
                    message += ` Fields ${match[1]}`
                    field = match[1]
                }
                response.status(HttpStatus.CONFLICT).json({
                    statusCode: HttpStatus.CONFLICT,
                    message,
                    field,
                  });
                  return;
            } else {
                message = exception.message
            }
        }
        
        return response.status(status).json({
            statusCode: status,
            error: status === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : exception.response?.error || 'Error',
            message: exception.response?.message || message,
        });
    }
}