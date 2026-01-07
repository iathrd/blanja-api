import { Module } from '@nestjs/common';
import { gcsProvider } from './gcs.provider';
import { GcsService } from './gcs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [gcsProvider, GcsService],
  exports: [GcsService],
})
export class GcsModule {}
