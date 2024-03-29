import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { v4 as generateUuid } from 'uuid';
import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
  DeleteBucketCommandOutput,
} from '@aws-sdk/client-s3';
import { IFile } from '../../common/interfaces/interfaces';
import { DownloadedFileType } from 'application/interfaces/interfaces';
import { Readable } from 'stream';

@Injectable()
export class AwsService {
  #s3 = new S3Client({ region: process.env.AWS_REGION });

  public async uploadFiles(files: IFile[]): Promise<string[]> {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }

  private async uploadFile(file: IFile): Promise<string> {
    const extension = file.originalname.match(/.(\w+)$/)[1];
    const key = `${generateUuid()}.${extension}`;
    const fileContent = await readFile(file.path);
    const data = await this.#s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: fileContent,
      }),
    );

    if (data.$metadata.httpStatusCode === 200) {
      return key;
    } else {
      // TODO handle exceptions
    }
  }

  public async downloadFiles(files: string[]): Promise<DownloadedFileType[]> {
    return Promise.all(files.map((fileUrl) => this.downloadFile(fileUrl)));
  }

  public async downloadFile(file: string): Promise<DownloadedFileType> {
    const data = await this.#s3.send(
      new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file,
      }),
    );

    return { stream: data.Body, name: file };
  }

  public async downloadFilesAsBase64(files: string[]): Promise<string[]> {
    const fileStreams = (await this.downloadFiles(files)).map(
      (file) => file.stream,
    );

    return Promise.all(
      fileStreams.map((stream, index) => {
        const fileType = files[index].split('.')[1];

        return this.getBase64FromStream(stream as Readable, fileType);
      }),
    );
  }

  private getBase64FromStream(
    stream: Readable,
    fileType: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const data: Uint8Array[] = [];

      function onData(chunk: Uint8Array): void {
        data.push(chunk);
      }

      stream.on('data', onData);
      stream.once('end', () => {
        const result = Buffer.concat(data).toString('base64');
        const mimeType =
          fileType === 'pdf' ? 'application/pdf' : `image/${fileType}`;

        resolve(`data:${mimeType}; base64, ${result}`);

        stream.off('data', onData);
      });
      stream.once('error', reject);
    });
  }

  private async removeFile(name: string): Promise<DeleteBucketCommandOutput> {
    const data = await this.#s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: name,
      }),
    );

    return data;
  }

  public removeFiles(names: string[]): Promise<DeleteBucketCommandOutput[]> {
    return Promise.all(
      names.map((file) => {
        return this.removeFile(file);
      }),
    );
  }
}
