import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
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
    const version =
      request.headers['x-api-version'] ||
      request.params?.version ||
      request.url.match(/\/v\d+/)?.[0]?.replace('/', '') ||
      'v1';

    return next.handle().pipe(
      map((data) => ({
        statusCode,
        message: 'Success',
        error: null,
        timestamp: Date.now(),
        version,
        path: request.url,
        data,
      })),
    );
  }
}
