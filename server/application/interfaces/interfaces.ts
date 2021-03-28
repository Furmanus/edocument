import { Readable } from 'stream';

export type DownloadedFileType = {
  stream: ReadableStream | Readable | Blob;
  name: string;
};
