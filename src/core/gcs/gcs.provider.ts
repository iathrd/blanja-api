import { Storage } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';

export const GCS_PROVIDER = 'GCS_PROVIDER';

export const gcsProvider = {
  provide: GCS_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService<EnvSchema>) => {
    const projectId = configService.getOrThrow<string>('GCP_PROJECT_ID');
    const keyFile = configService.getOrThrow<string>('GCP_KEY_FILE');

    return new Storage({
      projectId,
      keyFilename: keyFile || undefined,
    });
  },
};
