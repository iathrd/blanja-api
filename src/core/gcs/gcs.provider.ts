import { Storage } from '@google-cloud/storage';

export const GCS_PROVIDER = 'GCS_PROVIDER';

export const gcsProvider = {
  provide: GCS_PROVIDER,
  useFactory: () => {
    return new Storage({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE || undefined,
    });
  },
};
