import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/tags.dto';
import { IApplicationSession, IFile } from '../../common/interfaces/interfaces';
import { TagsService } from '../services/tags.service';
import { CreateTagValidationPipe } from '../pipes/createTag.pipe';
import { UserRequestInterceptor } from '../interceptors/userRequest.interceptor';
import { CreateDocumentDto } from '../dto/documents.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentValidationPipe } from '../pipes/createDocument.pipe';
import { BodyWithFiles } from '../decorators/bodyWithFiles.decorator';
import { DocumentsService } from '../services/documents.service';
import { AwsService } from '../services/aws.service';
import { AppDocument } from '../schemas/document.schema';

export type CreateDocumentBody = Omit<CreateDocumentDto, 'documentFile'> & {
  files: IFile[];
};

@Controller('/data')
@UseInterceptors(UserRequestInterceptor)
export class DataController {
  public constructor(
    private tagsService: TagsService,
    private documentsService: DocumentsService,
    private awsService: AwsService,
  ) {}

  @Post('/tags')
  @HttpCode(HttpStatus.CREATED)
  public async addTag(
    @Body(CreateTagValidationPipe) body: CreateTagDto,
    @Session() session: IApplicationSession,
  ): Promise<string> {
    const { tagName } = body;

    return this.tagsService
      .create({
        owner: session.userId,
        tagName,
      })
      .then((tag) => tag.tagName);
  }

  @Get('/tags')
  @HttpCode(HttpStatus.OK)
  public getTags(@Session() session: IApplicationSession): Promise<string[]> {
    return this.tagsService
      .findAll(session.userId)
      .then((tags) => tags.map((tag) => tag.tagName));
  }

  @Post('/document')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  public async addDocument(
    @BodyWithFiles(CreateDocumentValidationPipe) body: CreateDocumentBody,
    @Session() session: IApplicationSession,
  ): Promise<AppDocument> {
    const uploadedFilesKeys = await this.awsService.uploadFiles(body.files);
    const createdDocument = await this.documentsService.create({
      documentName: body.documentName,
      documentDate: body.documentDate,
      documentTags: body.documentTags,
      documentNetValue: body.documentNetValue,
      documentGrossValue: body.documentGrossValue,
      documentFile: uploadedFilesKeys,
      owner: session.userId,
    });

    return createdDocument;
  }
}
