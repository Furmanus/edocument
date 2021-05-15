import { CreateDocumentFormFields } from '../../../../../common/constants/createDocumentForm';

export interface IDocument {
  [CreateDocumentFormFields.DocumentName]: string;
  [CreateDocumentFormFields.DocumentDate]: string;
  [CreateDocumentFormFields.DocumentTags]: string[];
  [CreateDocumentFormFields.DocumentNetValue]: number;
  [CreateDocumentFormFields.DocumentGrossValue]: number;
  [CreateDocumentFormFields.DocumentFile]: string[];
  _id?: string;
}

export type DocumentWithPreviews = IDocument & {
  filesPreviews: string[];
};

export interface IDocumentWithPagination {
  documents: IDocument[];
  totalCount: number;
}
