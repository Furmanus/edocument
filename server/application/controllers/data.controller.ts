import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { CreateTagDto } from '../dto/tags.dto';
import { IApplicationSession, IFile } from '../../common/interfaces/interfaces';
import { TagsService } from '../services/tags.service';
import { CreateTagValidationPipe } from '../pipes/createTag.pipe';
import { UserRequestInterceptor } from '../interceptors/userRequest.interceptor';
import {
  CreateDocumentDto,
  GetDocumentWithPaginationDto,
} from '../dto/documents.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CreateDocumentValidationPipe } from '../pipes/createDocument.pipe';
import { BodyWithFiles } from '../decorators/bodyWithFiles.decorator';
import { DocumentsService } from '../services/documents.service';
import { AwsService } from '../services/aws.service';
import { AppDocument } from '../schemas/document.schema';
import { CompressService } from '../services/compress.service';
import { Response } from 'express';
import { EditDocumentValidationPipe } from '../pipes/editDocument.pipe';
import { ErrorCodes } from '../../../common/constants/errors';
import { DocumentsWithPagination } from '../interfaces/interfaces';

export type CreateDocumentBody = Omit<CreateDocumentDto, 'documentFile'> & {
  files: IFile[];
};
export type EditDocumentBody = Omit<CreateDocumentDto, 'documentFile'> & {
  files: IFile[];
};

@Controller('/data')
@UseInterceptors(UserRequestInterceptor)
export class DataController {
  public constructor(
    private tagsService: TagsService,
    private documentsService: DocumentsService,
    private awsService: AwsService,
    private compressService: CompressService,
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

  @Put('/document/:documentId')
  @HttpCode(HttpStatus.ACCEPTED)
  @UseInterceptors(AnyFilesInterceptor())
  public async editDocument(
    @Param('documentId') documentId: string,
    @BodyWithFiles(EditDocumentValidationPipe) body: EditDocumentBody,
    @Session() session: IApplicationSession,
  ): Promise<AppDocument> {
    const currentDocument = await this.documentsService.findEntry(
      session.userId,
      documentId,
    );
    const { files } = body;
    const { owner, documentFiles } = currentDocument;
    const hasNewFilesBeenAdded = files.length;
    let uploadedFilesKeys: string[];

    if (hasNewFilesBeenAdded) {
      await this.awsService.removeFiles(currentDocument.documentFiles);

      uploadedFilesKeys = await this.awsService.uploadFiles(files);
    }

    const updatedDocument = await this.documentsService.update(
      session.userId,
      documentId,
      {
        documentName: body.documentName,
        documentDate: body.documentDate,
        documentTags: body.documentTags?.split(','),
        documentNetValue: body.documentNetValue,
        documentGrossValue: body.documentGrossValue,
        documentFiles: hasNewFilesBeenAdded ? uploadedFilesKeys : documentFiles,
        owner,
      },
    );

    return updatedDocument;
  }

  @Post('/document')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(AnyFilesInterceptor())
  public async addDocument(
    @BodyWithFiles(CreateDocumentValidationPipe) body: CreateDocumentBody,
    @Session() session: IApplicationSession,
  ): Promise<AppDocument> {
    const tags = body.documentTags ? body.documentTags.split(',') : [];

    const uploadedFilesKeys = await this.awsService.uploadFiles(body.files);
    const createdDocument = await this.documentsService.create({
      documentName: body.documentName,
      documentDate: body.documentDate,
      documentTags: tags,
      documentNetValue: body.documentNetValue,
      documentGrossValue: body.documentGrossValue,
      documentFiles: uploadedFilesKeys,
      owner: session.userId,
    });

    return createdDocument;
  }

  @Delete('/document/:documentId')
  @HttpCode(HttpStatus.OK)
  public async deleteDocument(
    @Session() session: IApplicationSession,
    @Param('documentId') documentId: string,
  ): Promise<void> {
    const { userId } = session;
    const deletedDocument = await this.documentsService.findEntry(
      userId,
      documentId,
    );

    if (!deletedDocument) {
      throw new BadRequestException({
        errorCode: ErrorCodes.DocumentDoesntExists,
        message: "Document doesn't exist",
      });
    }

    const { documentFiles } = deletedDocument;

    await this.documentsService.delete(userId, documentId);
    await this.awsService.removeFiles(documentFiles);
  }

  @Get('/document')
  @HttpCode(HttpStatus.OK)
  public getDocuments(
    @Session() session: IApplicationSession,
    @Query() query: GetDocumentWithPaginationDto,
  ): Promise<DocumentsWithPagination> {
    const { currentPage, rowsPerPage, maxDate, minDate, name, tags } = query;
    const filters = { maxDate, minDate, name, tags: tags && tags.split(',') };

    return this.documentsService.findAllWithPagination(
      session.userId,
      currentPage,
      rowsPerPage,
      filters,
    );
  }

  @Get('/document/:id/files')
  @Header('Content-Type', 'application/octet-stream')
  @Header('Content-Disposition', 'attachment; filename=files.zip')
  @HttpCode(HttpStatus.OK)
  public async getDocumentFiles(
    @Session() session: IApplicationSession,
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<void> {
    const document = await this.documentsService.findEntry(session.userId, id);

    if (document?.documentFiles?.length) {
      const filesStreams = await this.awsService.downloadFiles(
        document?.documentFiles,
      );
      const zipStream = await this.compressService.compressFiles(filesStreams);

      zipStream.pipe(res);
    }
  }

  @Get('/document/:id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  public async getDocument(
    @Session() session: IApplicationSession,
    @Param('id') id: string,
  ): Promise<Omit<AppDocument, 'owner'> & { filesPreviews: string[] }> {
    const document = await this.documentsService.findEntry(session.userId, id);
    const documentFilesPreviews = await this.awsService.downloadFilesAsBase64(
      document.documentFiles,
    );
    const {
      documentTags,
      documentName,
      documentFiles,
      documentDate,
      documentGrossValue,
      documentNetValue,
    } = document;

    return {
      filesPreviews: documentFilesPreviews,
      documentName,
      documentNetValue,
      documentGrossValue,
      documentDate,
      documentFiles,
      documentTags,
    };
  }

  @Get('/document/:id/base64')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  public async getDocumentFilesAsBase64Array(
    @Session() session: IApplicationSession,
    @Param('id') id: string,
  ): Promise<string[]> {
    const document = await this.documentsService.findEntry(session.userId, id);

    if (document?.documentFiles?.length) {
      const document = await this.documentsService.findEntry(
        session.userId,
        id,
      );

      if (document) {
        return this.awsService.downloadFilesAsBase64(document.documentFiles);
      }
    }
  }
}
