/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import {
  Box,
  Button,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  Field,
  FieldRenderProps,
  Form,
  FormRenderProps,
} from 'react-final-form';
import { useCallback, useState } from 'react';
import { FormApi } from 'final-form';
import { DocumentsManageTexts } from '../constants/documentsManageTexts';
import { AppButton } from '../../../../common/components/AppButton';
import { UserTagsSelect } from './filtersModal/UserTagsSelect';
import { IManageFilters } from '../../../../../common/interfaces/interfaces';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newFilters: IManageFilters) => void;
  currentFilters: IManageFilters;
  userTags: string[];
}

const useStyles = makeStyles({
  modalWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '30px 60px',
    outline: 'none',
    '@media (max-width: 480px)': {
      padding: '20px 10px',
      margin: '0 15px',
      width: '95%',
    },
  },
  form: {
    minWidth: 300,
    '@media (max-width: 480px)': {
      width: '100%',
      margin: 5,
      minWidth: 'unset',
    },
  },
  typography: {
    marginBottom: 15,
  },
  cancelButton: {
    marginRight: 10,
  },
});
const dateInputLabelProps = {
  shrink: true,
};
const dateInputInlineStyles = {
  width: '49%',
};

export function DocumentsManageFiltersModal({
  isOpen,
  onClose,
  onSave,
  currentFilters,
  userTags,
}: IProps): JSX.Element {
  const classes = useStyles();
  const [tagsFilters, setTagsFilters] = useState<string[]>(currentFilters.tags);
  const onFormSubmit = useCallback(
    (value: IManageFilters, form: FormApi) => {
      const userFilters = { ...value, tags: tagsFilters };

      onSave(userFilters);
    },
    [tagsFilters],
  );
  const onCancelClick = useCallback(() => {
    onClose();
  }, []);
  const onTagsFiltersChange = useCallback(
    (tags: string[]) => {
      setTagsFilters(tags);
    },
    [setTagsFilters],
  );
  const renderTagsSelect = useCallback(() => {
    return (
      <UserTagsSelect
        onChange={onTagsFiltersChange}
        userTags={userTags}
        value={tagsFilters}
      />
    );
  }, [userTags, tagsFilters]);

  return (
    <Modal className={classes.modalWrapper} open={isOpen} onClose={onClose}>
      <Paper className={classes.modalContent} elevation={3}>
        <Form onSubmit={onFormSubmit} initialValues={currentFilters}>
          {(props: FormRenderProps<IManageFilters>) => (
            <form className={classes.form} onSubmit={props.handleSubmit}>
              <Typography
                className={classes.typography}
                variant="h6"
                align="center"
                component="h3"
              >
                {DocumentsManageTexts.DocumentsFiltersHeading}
              </Typography>
              <Field name="name" component={renderNameInput} />
              <Box
                width="100%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                mt="16px"
              >
                <Field name="minDate" component={renderMinDateInput} />
                <Field name="maxDate" component={renderMaxDateInput} />
              </Box>
              <Field name="tags" component={renderTagsSelect} multiple={true} />
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="flex-end"
                width="100%"
                mt="16px"
              >
                <Button
                  className={classes.cancelButton}
                  size="medium"
                  color="secondary"
                  onClick={onCancelClick}
                >
                  {
                    DocumentsManageTexts.DocumentsFiltersModalCancelFiltersButton
                  }
                </Button>
                <AppButton
                  size="medium"
                  variant="outlined"
                  color="primary"
                  type="submit"
                >
                  {DocumentsManageTexts.DocumentsFiltersModalSaveFiltersButton}
                </AppButton>
              </Box>
            </form>
          )}
        </Form>
      </Paper>
    </Modal>
  );
}

function renderNameInput(
  props: FieldRenderProps<string, HTMLInputElement>,
): JSX.Element {
  return (
    <TextField
      size="medium"
      type="text"
      fullWidth={true}
      label={DocumentsManageTexts.DocumentsFiltersNameInputLabel}
      inputProps={props.input}
    />
  );
}

function renderMinDateInput(
  props: FieldRenderProps<string, HTMLInputElement>,
): JSX.Element {
  return (
    <TextField
      size="medium"
      type="date"
      label={DocumentsManageTexts.DocumentsFiltersMinDateInputLabel}
      InputLabelProps={dateInputLabelProps}
      style={dateInputInlineStyles}
      inputProps={props.input}
    />
  );
}

function renderMaxDateInput(
  props: FieldRenderProps<string, HTMLInputElement>,
): JSX.Element {
  return (
    <TextField
      size="medium"
      type="date"
      label={DocumentsManageTexts.DocumentsFiltersMaxDateInputLabel}
      InputLabelProps={dateInputLabelProps}
      style={dateInputInlineStyles}
      inputProps={props.input}
    />
  );
}
