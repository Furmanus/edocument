import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateWriteOpResult } from 'mongoose';
import { CreateDocumentDto } from '../dto/documents.dto';
import { AppDocument, DocumentType } from '../schemas/document.schema';
import { DocumentsWithPagination } from '../interfaces/interfaces';
import { IManageFilters } from '../../../common/interfaces/interfaces';

type PreparedDocumentDto = Omit<CreateDocumentDto, 'documentFile'> & {
  documentFiles: string[];
};
type DocumentManageFilters = Pick<
  CreateDocumentDto,
  'documentName' | 'documentDate' | 'documentTags'
>;

type AddDocumentDataType = Omit<PreparedDocumentDto, 'documentTags'> & {
  owner: string;
  documentTags: string[];
};

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
  ): Promise<UpdateWriteOpResult> {
    return this.DocumentModel.updateOne(
      { owner: userId, _id: documentId },
      newDocumentData,
    ).exec();
  }

  public delete(ownerId: string, documentId: string): Promise<unknown> {
    return this.DocumentModel.deleteOne({
      owner: ownerId,
      _id: documentId,
    }).exec();
  }

  public findAll(userId: string): Promise<AppDocument[]> {
    return this.DocumentModel.find({ owner: userId }).exec();
  }

  public async findAllWithPagination(
    userId: string,
    currentPage: number,
    rowsPerPage: number,
    filters: IManageFilters,
  ): Promise<DocumentsWithPagination> {
    const rows = Number(rowsPerPage);
    const page = Number(currentPage);

    const [documents, totalCount] = await Promise.all([
      this.DocumentModel.find({
        owner: userId,
        ...this.prepareDocumentFilters(filters),
      })
        .limit(rows)
        .skip(page * rows)
        .exec(),
      this.countUserDocuments(userId, filters),
    ]);

    return {
      documents,
      totalCount,
    };
  }

  private prepareDocumentFilters(
    manageFilters: IManageFilters,
  ): FilterQuery<IManageFilters> {
    const filters: FilterQuery<DocumentManageFilters> = {};
    const { name, tags, minDate, maxDate } = manageFilters;

    if (name) {
      filters.documentName = {
        $regex: manageFilters.name,
      };
    }

    if (minDate || maxDate) {
      filters.documentDate = {};

      if (minDate) {
        filters.documentDate.$gte = minDate;
      }

      if (maxDate) {
        filters.documentDate.$lte = maxDate;
      }
    }

    if (tags) {
      filters.documentTags = {
        $all: tags as never,
      };
    }

    return filters;
  }

  private countUserDocuments(
    userId: string,
    filters: IManageFilters,
  ): Promise<number> {
    return this.DocumentModel.count({
      owner: userId,
      ...this.prepareDocumentFilters(filters),
    }).exec();
  }

  public findEntry(userId: string, documentId: string): Promise<AppDocument> {
    return this.DocumentModel.findOne({
      owner: userId,
      _id: documentId,
    }).exec();
  }
}
