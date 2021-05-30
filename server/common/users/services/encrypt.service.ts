import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private saltRounds = 12;

  public hashText(text: string): Promise<string> {
    return bcrypt.hash(text, this.saltRounds);
  }

  public compareText(plainText: string, hash: string): Promise<boolean> {
    if (!plainText || !hash) {
      return Promise.resolve(false);
    }

    return bcrypt.compare(plainText, hash);
  }
}
