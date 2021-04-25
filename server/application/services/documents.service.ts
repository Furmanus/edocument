import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from '../dto/documents.dto';
import { AppDocument, DocumentType } from '../schemas/document.schema';

type PreparedDocumentDto = Omit<CreateDocumentDto, 'documentFile'> & {
  documentFiles: string[];
};

type AddDocumentDataType = PreparedDocumentDto & { owner: string };

@Injectable()
export class DocumentsService {
  public constructor(
    @InjectModel(AppDocument.name) private DocumentModel: Model<DocumentType>,
  ) {}

  public create(document: AddDocumentDataType): Promise<AppDocument> {
    const createdDocument = new this.DocumentModel(document);

    return createdDocument.save();
  }

  public update(
    userId: string,
    documentId: string,
    newDocumentData: AddDocumentDataType,
  ): Promise<AppDocument> {
    return this.DocumentModel.updateOne(
      { owner: userId, _id: documentId },
      newDocumentData,
    ).exec();
  }

  public findAll(userId: string): Promise<AppDocument[]> {
    return this.DocumentModel.find({ owner: userId }).exec();
  }

  public findEntry(userId: string, documentId: string): Promise<AppDocument> {
    return this.DocumentModel.findOne({
      owner: userId,
      _id: documentId,
    }).exec();
  }
}
