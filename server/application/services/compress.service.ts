import * as archiver from 'archiver';
import { Injectable } from '@nestjs/common';
import { DownloadedFileType } from '../interfaces/interfaces';
import { Readable } from 'stream';
import { Archiver } from 'archiver';

@Injectable()
export class CompressService {
  public async compressFiles(files: DownloadedFileType[]): Promise<Archiver> {
    const zip = archiver('zip');

    zip.once('warning', this.onError);
    zip.once('error', this.onError);

    for (const { stream, name } of files) {
      zip.append((stream as unknown) as Readable, {
        name,
      });
    }

    await zip.finalize();

    return zip;
  }

  private onError(e: Error): void {
    console.error(e);
  }
}
