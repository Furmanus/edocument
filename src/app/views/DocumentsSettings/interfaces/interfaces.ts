import { CreateDocumentFormFields } from '../../../../../common/constants/createDocumentForm';

export interface IDocumentSettingsFormData {
  [CreateDocumentFormFields.DocumentName]: string;
  [CreateDocumentFormFields.DocumentDate]: string;
  [CreateDocumentFormFields.DocumentTags]: string[];
  [CreateDocumentFormFields.DocumentNetValue]: number;
  [CreateDocumentFormFields.DocumentGrossValue]: number;
  [CreateDocumentFormFields.DocumentFile]: File;
}
