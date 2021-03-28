export const enum DocumentFormConstants {
  DocumentNameMaxLength = 32,
}

export const enum CreateDocumentFormFields {
  DocumentName = 'documentName',
  DocumentDate = 'documentDate',
  DocumentTags = 'documentTags',
  DocumentNetValue = 'documentNetValue',
  DocumentGrossValue = 'documentGrossValue',
  DocumentFile = 'documentFile',
}

export const acceptedFileUploadFiles = [
  'image/pdf',
  'image/png',
  'image/gif',
  'image/jpg',
  'image/jpeg',
  'image/bmp',
];
