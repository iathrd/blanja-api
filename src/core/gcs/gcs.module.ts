import { Module } from '@nestjs/common';
import { gcsProvider } from './gcs.provider';
import { GcsService } from './gcs.service';

@Module({
  providers: [gcsProvider, GcsService],
  exports: [GcsService],
})
export class GcsModule {}
