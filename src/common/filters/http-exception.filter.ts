import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface ExceptionResponseBody {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let message: string | string[] = exception.message;
    let error = exception.name;

    if (
      exception instanceof BadRequestException &&
      typeof exceptionResponse === 'object' &&
      exceptionResponse !== null &&
      'message' in exceptionResponse
    ) {
      const res = exceptionResponse as ExceptionResponseBody;
      message = res.message ?? message;
      error = 'ValidationError';
    }

    const version =
      request.headers['x-api-version'] ||
      request.url.match(/\/v\d+/)?.[0]?.replace('/', '') ||
      'v1';

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: Date.now(),
      version,
      path: request.url,
      data: null,
    });
  }
}
