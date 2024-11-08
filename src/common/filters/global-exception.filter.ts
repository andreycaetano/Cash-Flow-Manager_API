import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | object = 'Internal Server Error';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseMessage = exception.getResponse();
      if (typeof responseMessage === 'object' && responseMessage !== null) {
        message = responseMessage['message'] || 'An error occurred';
        error = responseMessage['error'] || HttpStatus[statusCode];
      } else {
        message = responseMessage;
        error = HttpStatus[statusCode];
      }
      if (statusCode === HttpStatus.UNAUTHORIZED) {
        message = 'Invalid token, please provide a valid token.';
        error = 'Unauthorized';
      }

    } else if (exception instanceof QueryFailedError) {         
      console.log(exception.driverError);
         
      if (
        exception.driverError.code === '22P02' &&
        exception.driverError.message.includes('invalid input syntax for type uuid')
      ) {
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Invalid UUID format.';
        error = 'Bad Request';
      } else if (exception.driverError.code === '23505') {
        statusCode = HttpStatus.CONFLICT;
        message = 'This value already exists. Please provide a unique value.';
        const match = exception.driverError.detail.match(/Key \(([^)]+)\)=\(([^)]+)\) already exists/);
        if (match) {
          message += ` Field: ${match[1]}`;
        }
        error = 'Conflict';
      } else {
        console.log(exception.driverError);
        
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database query failed.';
        error = 'Internal Server Error';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(statusCode).json({
      statusCode,
      error,
      message
    });
  }
}
