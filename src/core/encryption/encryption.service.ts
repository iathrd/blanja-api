import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  /**
   * Hash a password using Argon2id.
   */
  async hashPassword(password: string): Promise<string> {
    try {
      const hashed = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 256 * 1024, // 256 MB
        timeCost: 3,
        parallelism: 2,
      });

      return hashed; // Fix ESLint: no-unsafe-return
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Password hashing failed: ${err.message}`);
      }
      throw new Error('Password hashing failed');
    }
  }

  /**
   * Verify a password against a stored Argon2id hash.
   */
  async verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      const isValid = await argon2.verify(hash, password);

      return isValid;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Password verification failed: ${err.message}`);
      }
      throw new Error('Password verification failed');
    }
  }

  /**
   * Derive a 32-byte symmetric key using Argon2id (AES-256 compatible).
   */
  async deriveKey(password: string): Promise<string> {
    try {
      const salt = crypto.randomBytes(16);

      // Output is Buffer | string, ESLint hates it
      const result = await argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 256 * 1024,
        timeCost: 3,
        parallelism: 2,
        salt,
        hashLength: 32,
        raw: true, // ensures output should be Buffer
      });

      // Narrow type to satisfy ESLint
      if (!(result instanceof Buffer)) {
        throw new Error('Argon2 returned unexpected hash type');
      }

      const key = Buffer.concat([salt, result]).toString('base64');
      return key;
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(`Key derivation failed: ${err.message}`);
      }
      throw new Error('Key derivation failed');
    }
  }
}
