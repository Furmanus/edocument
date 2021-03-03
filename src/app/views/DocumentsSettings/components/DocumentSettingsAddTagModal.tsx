import * as React from 'react';
import * as Modal from 'react-modal';
import {
  Box,
  Button,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { DocumentSettingsTexts } from '../constants/documentSettingsTexts';
import { useCallback } from 'react';
import { Field, FieldRenderProps, Form } from 'react-final-form';
import { ApplicationApi } from '../../../api/api';
import { CreateTagFormFields } from '../../../../../common/constants/createTagForm';
import { addTagErrorCodeToMessageMap } from '../constants/addTagFormErrors';
import { AppButton } from '../../../../common/components/AppButton';

Modal.setAppElement('#app');

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const modalStyles = {
  content: {
    width: '100%',
    height: '100%',
    maxWidth: 640,
    maxHeight: 480,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
};
const useStyles = makeStyles({
  form: {
    width: '100%',
    maxWidth: 360,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 'auto',
  },
  inputError: {
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    fontSize: 11,
    minHeight: 16,
  },
  inputErrorActive: {
    opacity: 1,
  },
  cancelButton: {
    marginRight: 5,
  },
});

function renderTagNameInput(
  props: FieldRenderProps<string, HTMLInputElement>,
): JSX.Element {
  const { input: inputProps, meta } = props;
  const classes = useStyles();
  const hasError =
    !meta.modifiedSinceLastSubmit &&
    meta.touched &&
    (meta.error || meta.submitError);

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <TextField
        name={CreateTagFormFields.TagName}
        label={DocumentSettingsTexts.AddTagTagNameInputLabel}
        type="text"
        size="medium"
        variant="outlined"
        fullWidth={true}
        {...inputProps}
      />
      <Typography
        component="span"
        color="error"
        className={`${classes.inputError} ${
          hasError ? classes.inputErrorActive : ''
        }`}
      >
        {meta.error || meta.submitError}
      </Typography>
    </Box>
  );
}

export function DocumentSettingsAddTagModal(props: IProps) {
  const classes = useStyles();
  const { isOpen, onClose } = props;
  const onSubmit = useCallback(async (formData: { tagName: string }) => {
    try {
      await ApplicationApi.createTag(formData.tagName);
    } catch (e) {
      const errors = e.response?.data?.message;

      if (Array.isArray(errors)) {
        const reducedErrors = errors.reduce((result, error) => {
          if (error.fieldName) {
            result[error.fieldName] =
              addTagErrorCodeToMessageMap[error.errorCode];
          } else {
            const globalError = addTagErrorCodeToMessageMap[error.errorCode];
          }

          return result;
        }, {});

        return reducedErrors;
      }
    }
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add tag modal"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={true}
      style={modalStyles}
      closeTimeoutMS={300}
    >
      <Form onSubmit={onSubmit}>
        {(formProps) => (
          <form onSubmit={formProps.handleSubmit} className={classes.form}>
            <Typography component="h3" variant="h6">
              {DocumentSettingsTexts.AddTagHeading}
            </Typography>
            <Field
              name={CreateTagFormFields.TagName}
              render={renderTagNameInput}
            />
            <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                color="primary"
                size="small"
                className={classes.cancelButton}
                onClick={onClose}
                disabled={formProps.submitting}
              >
                {DocumentSettingsTexts.AddTagCancelButton}
              </Button>
              <AppButton
                variant="contained"
                color="primary"
                type="submit"
                size="small"
                disabled={formProps.submitting}
                isLoading={formProps.submitting}
              >
                {DocumentSettingsTexts.AddTagSubmitButton}
              </AppButton>
            </Box>
          </form>
        )}
      </Form>
    </Modal>
  );
}
