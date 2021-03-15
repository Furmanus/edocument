import * as React from 'react';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import { DocumentSettingsTexts } from '../constants/documentSettingsTexts';
import { FormApi } from 'final-form';
import { Autocomplete } from '@material-ui/lab';
import { DocumentSettingsFormAddTagLink } from './DocumentSettingsFormAddTagLink';
import { DocumentSettingsAddTagModal } from './DocumentSettingsAddTagModal';
import { ApplicationApi } from '../../../api/api';
import {
  acceptedFileUploadFiles,
  CreateDocumentFormFields,
} from '../../../../../common/constants/createDocumentForm';
import { DropzoneArea } from 'material-ui-dropzone';
import { fileUploadImagePreviewProps } from '../constants/fileUpload';
import { IDocumentSettingsFormData } from '../interfaces/interfaces';
import { createDocumentErrorCodeToMessageMap } from '../constants/createDocumentFormErrors';
import { AppContext } from '../../../AppRoot';
import { openSnackBarAction } from '../../../actions/appActions';
import { TextFieldWithHint } from '../../../../common/components/TextFieldWithHint';
import { AppButton } from '../../../../common/components/AppButton';

const styles = {
  wrapper: {
    width: '100%',
    maxWidth: '480px',
    height: '100%',
    '@media (min-width: 480px)': {
      margin: '30px 60px',
      height: 'unset',
    },
  },
  form: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px 40px',
  },
  formFieldAutoComplete: {
    marginTop: 16,
    marginBottom: 20,
  },
  valueInputWrapper: {
    maxWidth: 'calc(100% - 16px)',
  },
  fileUpload: {
    marginTop: 15,
    borderWidth: 1,
    transition: 'border 0.3s ease-in-out',
    '&.error': {
      border: '2px solid red',
    },
  },
  fileUploadHelper: {
    fontSize: 10,
    minHeight: 16,
    transition: 'color 0.3s ease-in-out',
  },
};
const grossValueWrapperProps = { alignItems: 'flex-end' };
const filesAccepted = acceptedFileUploadFiles
  .map((fileType) => fileType.replace('image/', '.'))
  .join(' ');
const dropZoneHelperText = DocumentSettingsTexts.DropZoneHelperText.replace(
  '{{files}}',
  filesAccepted,
);

interface IProps {
  mode: 'create' | 'edit';
  classes: Record<keyof typeof styles, string>;
}

interface IState {
  tags: string[];
  isFetchingTags: boolean;
  isAddTagModalOpen: boolean;
}

class DocumentSettingsFormClass extends React.PureComponent<IProps, IState> {
  public static contextType = AppContext;
  public static defaultProps: Partial<IProps> = {
    mode: 'create',
  };

  public state: IState = {
    tags: [],
    isFetchingTags: false,
    isAddTagModalOpen: false,
  };

  public context: React.ContextType<typeof AppContext>;

  public componentDidMount(): void {
    this.fetchTags();
  }

  private async fetchTags(): Promise<void> {
    this.setState({ isFetchingTags: true });

    const tags = await ApplicationApi.getTags();

    this.setState({ isFetchingTags: false, tags });
  }

  private onFormSubmit = async (
    value: IDocumentSettingsFormData,
    form: FormApi,
  ): Promise<void> => {
    const { dispatch } = this.context;

    try {
      await ApplicationApi.createDocument(value);

      dispatch(
        openSnackBarAction(
          DocumentSettingsTexts.DocumentCreatedSnackbarText,
          'success',
        ),
      );
    } catch (e) {
      const errors = e.response?.data?.message;
      let preparedErrors;
      let globalError;

      if (Array.isArray(errors)) {
        preparedErrors = errors.reduce((result, error) => {
          if (error.fieldName) {
            result[error.fieldName] =
              createDocumentErrorCodeToMessageMap[error.errorCode];
          } else {
            globalError = createDocumentErrorCodeToMessageMap[error.errorCode];
          }

          return result;
        }, {});
      }

      if (globalError) {
        dispatch(openSnackBarAction(globalError, 'error'));
      }

      if (preparedErrors && Object.keys(preparedErrors).length) {
        return preparedErrors;
      }
    }
  };

  private renderNameInput = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    return (
      <TextFieldWithHint
        size="medium"
        type="text"
        fullWidth={true}
        label={DocumentSettingsTexts.DocumentNameInputLabel}
        InputLabelProps={{
          shrink: true,
        }}
        helperText={DocumentSettingsTexts.DocumentNameHelperText}
        fieldProps={props}
      />
    );
  };

  private renderDateInput = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    return (
      <TextFieldWithHint
        size="medium"
        type="date"
        fullWidth={true}
        label={DocumentSettingsTexts.DocumentDateInputLabel}
        InputLabelProps={{
          shrink: true,
        }}
        fieldProps={props}
      />
    );
  };

  private renderTagsList = (
    props: FieldRenderProps<string[]>,
  ): React.ReactNode => {
    const { input: inputProps, className } = props;
    const { isFetchingTags, tags } = this.state;
    const isDisabled = isFetchingTags || tags.length === 0;
    let placeholder =
      tags.length > 0
        ? DocumentSettingsTexts.DocumentTagsSelectPlaceholder
        : DocumentSettingsTexts.DocumentTagsSelectNoTagsPlaceholder;

    if (isFetchingTags) {
      placeholder = DocumentSettingsTexts.DocumentTagsSelectLoadingPlaceholder;
    }
    // TODO dorobic loader przy pobieraniu tagow
    // TODO dorobic obsluge bledow
    return (
      <Autocomplete
        multiple
        className={className}
        limitTags={2}
        id="tagsList"
        fullWidth={true}
        filterSelectedOptions={true}
        blurOnSelect={true}
        options={tags}
        loading={isFetchingTags}
        disabled={isDisabled}
        onChange={(e, value) => inputProps.onChange(value)}
        onBlur={inputProps.onBlur}
        onFocus={inputProps.onFocus}
        renderInput={(props) => (
          <React.Fragment>
            <TextField
              placeholder={placeholder}
              {...props}
              InputProps={{
                ...props.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isFetchingTags ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {props.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
            <DocumentSettingsFormAddTagLink onClick={this.onAddTagClick} />
          </React.Fragment>
        )}
      />
    );
  };

  private renderNetDocumentValue = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    const { className } = props;

    return (
      <TextFieldWithHint
        additionalClasses={className}
        size="medium"
        type="number"
        label={DocumentSettingsTexts.DocumentNetValueInputLabel}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
        }}
        fieldProps={props}
      />
    );
  };

  private renderGrossDocumentValue = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    const { className } = props;

    return (
      <TextFieldWithHint
        additionalClasses={className}
        size="medium"
        type="number"
        label={DocumentSettingsTexts.DocumentGrossValueInputLabel}
        wrapperProps={grossValueWrapperProps}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: <InputAdornment position="start">PLN</InputAdornment>,
        }}
        fieldProps={props}
      />
    );
  };

  private renderDropZone = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    const { input: inputProps, meta } = props;
    const { classes } = this.props;
    const { error, submitError, touched, modifiedSinceLastSubmit } = meta;
    const errorToDisplay =
      touched && !modifiedSinceLastSubmit && (error || submitError);
    // TODO use something better or write own file upload component
    // TODO don't pass new instance of object with every render
    // TODO move to separate component
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        width="100%"
      >
        <DropzoneArea
          classes={{
            root: `${classes.fileUpload} ${errorToDisplay ? 'error' : ''}`,
          }}
          dropzoneText={DocumentSettingsTexts.DropZoneText}
          filesLimit={4}
          previewGridProps={fileUploadImagePreviewProps}
          showAlerts={false}
          maxFileSize={1024 * 1024}
          {...inputProps}
        />
        <Typography
          className={classes.fileUploadHelper}
          color={errorToDisplay ? 'error' : 'textPrimary'}
        >
          {errorToDisplay || dropZoneHelperText}
        </Typography>
      </Box>
    );
  };

  private onAddTagClick = (): void => {
    this.setState({
      isAddTagModalOpen: true,
    });
  };

  private onAddTagModalClose = (): void => {
    this.setState({
      isAddTagModalOpen: false,
    });

    this.fetchTags();
  };

  public render(): JSX.Element {
    const { classes, mode } = this.props;
    const { isAddTagModalOpen } = this.state;
    const headingText =
      mode === 'create'
        ? DocumentSettingsTexts.HeadingCreate
        : DocumentSettingsTexts.HeadingEdit;
    const submitButtonText =
      mode === 'create'
        ? DocumentSettingsTexts.SubmitButtonCreate
        : DocumentSettingsTexts.SubmitButtonEdit;

    return (
      <React.Fragment>
        <Paper component="section" className={classes.wrapper} elevation={3}>
          <Form onSubmit={this.onFormSubmit}>
            {(props) => (
              <form onSubmit={props.handleSubmit} className={classes.form}>
                <Typography component="h2" variant="h5">
                  {headingText}
                </Typography>
                <Field
                  name={CreateDocumentFormFields.DocumentName}
                  render={this.renderNameInput}
                />
                <Field
                  name={CreateDocumentFormFields.DocumentDate}
                  render={this.renderDateInput}
                />
                <Field
                  name={CreateDocumentFormFields.DocumentTags}
                  className={classes.formFieldAutoComplete}
                  render={this.renderTagsList}
                  multiple={true}
                />
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Field
                    name={CreateDocumentFormFields.DocumentNetValue}
                    className={classes.valueInputWrapper}
                    render={this.renderNetDocumentValue}
                  />
                  <Field
                    name={CreateDocumentFormFields.DocumentGrossValue}
                    className={classes.valueInputWrapper}
                    render={this.renderGrossDocumentValue}
                  />
                </Box>
                <Field
                  name={CreateDocumentFormFields.DocumentFile}
                  render={this.renderDropZone}
                />
                <Box
                  width="100%"
                  margin="20px 0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button color="primary" disabled={props.submitting}>
                    {DocumentSettingsTexts.Cancel}
                  </Button>
                  <AppButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="medium"
                    disabled={props.submitting}
                    isLoading={props.submitting}
                  >
                    {submitButtonText}
                  </AppButton>
                </Box>
              </form>
            )}
          </Form>
        </Paper>
        <DocumentSettingsAddTagModal
          isOpen={isAddTagModalOpen}
          onClose={this.onAddTagModalClose}
        />
      </React.Fragment>
    );
  }
}

export const DocumentSettingsForm = withStyles(styles as any)(
  DocumentSettingsFormClass,
);
