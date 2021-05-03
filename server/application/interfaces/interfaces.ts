import { Readable } from 'stream';
import { AppDocument } from '../schemas/document.schema';

export type DownloadedFileType = {
  stream: ReadableStream | Readable | Blob;
  name: string;
};

export type DocumentsWithPagination = {
  documents: AppDocument[];
  totalCount: number;
};
