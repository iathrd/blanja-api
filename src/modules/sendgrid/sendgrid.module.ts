import { Module } from '@nestjs/common';
import { SendgridProvider } from './sendgrid.provider';
import { SendgridService } from './sendgrid.service';

@Module({
  providers: [SendgridProvider, SendgridService],
  exports: [SendgridProvider, SendgridService],
})
export class SendgridModule {}
