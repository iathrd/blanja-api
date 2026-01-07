import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { GCS_PROVIDER } from './gcs.provider';
import { ConfigService } from '@nestjs/config';
import { EnvSchema } from 'src/config/env.schema';

@Injectable()
export class GcsService {
  constructor(
    @Inject(GCS_PROVIDER) private readonly storage: Storage,
    private configService: ConfigService<EnvSchema>,
  ) {}

  private get bucket() {
    const bucketName = this.configService.getOrThrow<string>('GCS_BUCKET_NAME');
    return this.storage.bucket(bucketName);
  }

  async uploadFile(file: Express.Multer.File, folder = '') {
    if (!file || !file.originalname) {
      throw new Error('Invalid file');
    }
    const filename = `${folder}${Date.now()}-${file.originalname}`;
    const blob = this.bucket.file(filename);

    await blob.save(file.buffer, {
      contentType: file.mimetype,
      resumable: false,
    });

    return {
      filename,
      url: `https://storage.googleapis.com/${this.bucket.name}/${filename}`,
    };
  }

  async getSignedUrl(filename: string, expiresInMinutes = 15) {
    const file = this.bucket.file(filename);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresInMinutes * 60 * 1000,
    });

    return url;
  }

  async deleteFile(filename: string) {
    await this.bucket.file(filename).delete();
    return true;
  }
}
