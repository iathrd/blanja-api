import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { GCS_PROVIDER } from './gcs.provider';

@Injectable()
export class GcsService {
  private bucketName = process.env.GCS_BUCKET_NAME!;

  constructor(@Inject(GCS_PROVIDER) private readonly storage: Storage) {}

  private get bucket() {
    return this.storage.bucket(this.bucketName);
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
