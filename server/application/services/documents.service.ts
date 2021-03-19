import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from '../dto/documents.dto';
import { AppDocument, DocumentType } from '../schemas/document.schema';

type PreparedDocumentDto = Omit<CreateDocumentDto, 'documentFile'> & {
  documentFile: string[];
};

@Injectable()
export class DocumentsService {
  public constructor(
    @InjectModel(AppDocument.name) private DocumentModel: Model<DocumentType>,
  ) {}

  public create(
    document: PreparedDocumentDto & { owner: string },
  ): Promise<AppDocument> {
    const createdDocument = new this.DocumentModel(document);

    return createdDocument.save();
  }
}
