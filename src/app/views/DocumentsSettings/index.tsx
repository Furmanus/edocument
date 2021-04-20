import * as React from 'react';
import { DocumentSettingsForm } from './components/DocumentSettingsForm';
import { useParams } from 'react-router';

export default function DocumentsCreate(): JSX.Element {
  const params = useParams<{ documentId: string }>();

  return <DocumentSettingsForm editedDocumentId={params.documentId} />;
}
