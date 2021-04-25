import { DocumentFormConstants } from '../../../../../common/constants/createDocumentForm';

export const enum DocumentSettingsTexts {
  HeadingCreate = 'Add document',
  HeadingEdit = 'Edit document',
  SubmitButtonCreate = 'Add',
  SubmitButtonEdit = 'Edit',
  Cancel = 'Cancel',
  DocumentNameInputLabel = 'Name',
  DocumentNameHelperText = 'Required field. Max 32 char allowed',
  DocumentDateInputLabel = 'Date',
  DocumentTagsSelectLabel = 'Tags',
  DocumentTagsSelectPlaceholder = 'Select tags',
  DocumentTagsSelectNoTagsPlaceholder = "You don't have any tags",
  DocumentTagsSelectLoadingPlaceholder = 'Loading tags',
  DocumentNetValueInputLabel = 'Net value',
  DocumentGrossValueInputLabel = 'Gross value',
  AddTagButton = 'Add tag',
  DropZoneText = 'Drag and drop file or click',
  DropZoneEditText = 'Add new files to overwrite',
  DropZoneHelperText = 'Allowed files: {{files}}',
  DocumentCreatedSnackbarText = 'Document successfully created',
  DocumentEditedSnackbarText = 'Document edited created',
  // ADD TAG MODAL
  AddTagHeading = 'Add tag',
  AddTagTagNameInputLabel = 'Tag name',
  AddTagCancelButton = 'Cancel',
  AddTagSubmitButton = 'Add',
  TagAlreadyExistError = 'Tag already exists',
  TagNameTooShortError = 'Tag name too short, minimum 3 chars required',
  AddTagSubmitUnknownError = 'Failed to create tag',
  AddTagSuccessSnackBarText = 'Tag created successfully',
  AddTagInternalServerError = 'Internal server error',
  // CREATE DOCUMENT ERRORS
  DocumentErrorNameEmpty = 'Required field',
  DocumentErrorNameTooLong = 'Max 32 chars allowed',
  DocumentErrorInvalidTag = "One of tags doesn't exist",
  DocumentErrorNetValueInvalidType = 'Value must be a number type',
  DocumentErrorGrossValueInvalidType = 'Value must be a number type',
  DocumentErrorNetValueGreaterThanGrossValue = 'Invalid amount',
  DocumentErrorTooManyFiles = 'Max 4 files allowed',
  DocumentErrorFileInvalidType = 'File invalid type',
  DocumentErrorNoFile = 'At least 1 file required',
  DocumentErrorUnknownError = 'Failed to create document',
}
