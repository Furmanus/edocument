import * as React from 'react';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import {
  Box,
  Button,
  CircularProgress,
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
  formField: {
    marginBottom: 20,
  },
  formFieldAutoComplete: {
    marginTop: 16,
    marginBottom: 20,
  },
};

interface IProps {
  mode: 'create' | 'edit';
  classes: Record<keyof typeof styles, string>;
}

interface IState {
  tags: string[];
  isFetchingTags: boolean;
  isAddTagModalOpen: boolean;
}

interface IFormValues {
  documentName: string;
}

class DocumentSettingsFormClass extends React.PureComponent<IProps, IState> {
  public static defaultProps: Partial<IProps> = {
    mode: 'create',
  };

  public state: IState = {
    tags: [],
    isFetchingTags: false,
    isAddTagModalOpen: false,
  };

  public componentDidMount(): void {
    this.fetchTags();
  }

  private async fetchTags(): Promise<void> {
    this.setState({ isFetchingTags: true });
    // TODO fetch tags from server
    const tags = await Promise.resolve(['test', 'test1', 'test2', 'test3']);

    this.setState({ isFetchingTags: false, tags });
  }

  private onFormSubmit = (value: IFormValues, form: FormApi): void => {
    console.log(value, form);
  };

  private renderNameInput = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    const { input: inputProps, className } = props;

    return (
      <TextField
        size="medium"
        type="text"
        className={className}
        fullWidth={true}
        label={DocumentSettingsTexts.DocumentNameInputLabel}
        {...inputProps}
      />
    );
  };

  private renderDateInput = (
    props: FieldRenderProps<string, HTMLInputElement>,
  ): React.ReactNode => {
    const { input: inputProps, className } = props;

    return (
      <TextField
        size="medium"
        type="date"
        className={className}
        fullWidth={true}
        label={DocumentSettingsTexts.DocumentDateInputLabel}
        InputLabelProps={{
          shrink: true,
        }}
        {...inputProps}
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

  private onAddTagClick = (): void => {
    this.setState({
      isAddTagModalOpen: true,
    });
  };

  private onAddTagModalClose = (): void => {
    this.setState({
      isAddTagModalOpen: false,
    });
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
                  name="documentName"
                  className={classes.formField}
                  render={this.renderNameInput}
                />
                <Field
                  name="documentDate"
                  className={classes.formField}
                  render={this.renderDateInput}
                />
                <Field
                  name="documentTags"
                  className={classes.formFieldAutoComplete}
                  render={this.renderTagsList}
                  multiple={true}
                />
                <Box
                  width="100%"
                  margin="20px 0"
                  display="flex"
                  flexDirection="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Button color="primary">
                    {DocumentSettingsTexts.Cancel}
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    {submitButtonText}
                  </Button>
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
