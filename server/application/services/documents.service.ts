import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDocumentDto } from '../dto/documents.dto';
import { AppDocument, DocumentType } from '../schemas/document.schema';

type PreparedDocumentDto = Omit<CreateDocumentDto, 'documentFile'> & {
  documentFile: string[];
};

@Injectable()
export class DocumentsService {
  public constructor(
    @InjectModel(AppDocument.name) private DocumentModel: DocumentType,
  ) {}

  public create(document: PreparedDocumentDto): Promise<void> {
    console.log('document service received document to create', document);

    return Promise.resolve();
  }
}
