import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: 'Success',
        error: null,
        timestamp: Date.now(),
        version: 'v1',
        path: request.url,
        data,
      })),
      catchError((err: unknown) => {
        const statusCode = err instanceof HttpException ? err.getStatus() : 500;
        const message =
          err instanceof Error ? err.message : 'Internal server error';
        const errorName = err instanceof Error ? err.name : 'Error';
        const errorResponse = {
          statusCode,
          message,
          error: errorName,
          timestamp: Date.now(),
          version: 'v2',
          path: request.url,
          data: {},
        };
        return throwError(() => new HttpException(errorResponse, statusCode));
      }),
    );
  }
}
