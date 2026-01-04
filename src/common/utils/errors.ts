import { BadRequestException } from '@nestjs/common';

type DbError = {
  code?: string;
};

function hasErrorCode(error: unknown): error is DbError {
  return typeof error === 'object' && error !== null && 'code' in error;
}

export function duplicateError(error: unknown, message: string): never | void {
  if (!hasErrorCode(error)) return;

  if (error.code === '23505' || error.code === 'ER_DUP_ENTRY') {
    throw new BadRequestException(message);
  }
}
