export class CreateDocumentDto {
  public documentName: string;
  public documentDate: string;
  public documentFile: File;
  public documentGrossValue: number;
  public documentNetValue: number;
  public documentTags: string;
}

export class GetDocumentWithPaginationDto {
  currentPage: number;
  rowsPerPage: number;
}
