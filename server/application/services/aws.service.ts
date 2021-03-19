import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { v4 as generateUuid } from 'uuid';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IFile } from '../../common/interfaces/interfaces';

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
}
