import * as archiver from 'archiver';
import { Injectable } from '@nestjs/common';
import { DownloadedFileType } from '../interfaces/interfaces';
import { Readable } from 'stream';
import { Archiver } from 'archiver';

@Injectable()
export class CompressService {
  public async compressFiles(files: DownloadedFileType[]): Promise<Archiver> {
    const zip = archiver('zip');

    for (const { stream, name } of files) {
      zip.append((stream as unknown) as Readable, {
        name,
      });
    }

    return zip;
  }
}
