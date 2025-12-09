import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { SafeUser } from '../types/auth.type';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): SafeUser => {
    const req = ctx.switchToHttp().getRequest<Request>();
    return req.user as SafeUser;
  },
);
