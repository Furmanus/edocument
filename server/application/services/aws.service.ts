import { Injectable } from '@nestjs/common';
import { IFile } from '../../common/interfaces/interfaces';

@Injectable()
export class AwsService {
  public uploadFiles(files: IFile[]): Promise<string[]> {
    console.log('received files to upload', files);

    return Promise.resolve(['aaa']);
  }
}
