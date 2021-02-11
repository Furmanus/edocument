import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent, FocusEvent } from 'react';

import {
  Button,
  InputAdornment,
  TextField,
  withStyles,
} from '@material-ui/core';
import {
  AccountBox,
  Lock,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@material-ui/icons';
import { LoginTexts } from '../contants/texts';
import { ClassesType } from '../../common/interfaces/interfaces';
import { createUserApi, loginUserApi } from '../api/loginApi';
import {
  validateRepeatPassword,
  validateUserName,
  validateUserPassword,
} from '../utils/loginForm';

interface IState {
  readonly mode: 'login' | 'register';
  readonly userInputValue: string;
  readonly passwordInputValue: string;
  readonly repeatPasswordInputValue: string;
  readonly passwordVisible: boolean;
  readonly repeatPasswordVisible: boolean;
  readonly loginInputError: string;
  readonly passwordInputError: string;
  readonly repeatPasswordInputError: string;
  readonly loginInputHasBeenTouched: boolean;
  readonly passwordInputHasBeenTouched: boolean;
  readonly repeatPasswordInputHasBeenTouched: boolean;
}

const styles = {
  form: {
    width: 'calc(100% - 70px)',
    padding: '30px 0',
  },
  input: {
    marginBottom: 8,
  },
  repeatPasswordInputWrapper: {
    overflow: 'hidden',
    maxHeight: 0,
    transition: 'max-height 0.3s ease-in-out',
  },
  repeatPasswordInputWrapperVisible: {
    maxHeight: 24 + 32,
  },
  toggleButton: {
    paddingLeft: 0,
    paddingTop: 0,
    marginTop: 8,
    textTransform: 'none',
  },
  submitButton: {
    marginTop: 0,
  },
  errorText: {
    fontSize: 10,
    marginTop: 0,
  },
};

type Props = { classes: ClassesType<typeof styles> };

class LoginFormClass extends React.PureComponent<Props, IState> {
  public state: IState = {
    mode: 'login',
    userInputValue: '',
    passwordInputValue: '',
    repeatPasswordInputValue: '',
    passwordVisible: false,
    repeatPasswordVisible: false,
    loginInputError: null,
    passwordInputError: null,
    repeatPasswordInputError: null,
    loginInputHasBeenTouched: false,
    passwordInputHasBeenTouched: false,
    repeatPasswordInputHasBeenTouched: false,
  };

  private get isFormValid(): boolean {
    const {
      loginInputError,
      passwordInputError,
      repeatPasswordInputError,
      mode,
    } = this.state;

    if (mode === 'register') {
      return (
        loginInputError === null &&
        passwordInputError === null &&
        repeatPasswordInputError === null
      );
    }

    return loginInputError === null && passwordInputError === null;
  }

  private onFormSubmit = async (e: FormEvent): Promise<void> => {
    const { passwordInputValue, userInputValue, mode } = this.state;

    e.preventDefault();

    if (mode === 'register') {
      this.validateForm();
    }

    if (!this.isFormValid) {
      return;
    }

    if (mode === 'register') {
      await createUserApi(userInputValue, passwordInputValue);
      console.log('register');
    } else {
      await loginUserApi(userInputValue, passwordInputValue);
      console.log('login');
    }
  };

  private validateForm(): void {
    this.setState((state) => ({
      loginInputError: validateUserName(state.userInputValue),
      passwordInputError: validateUserPassword(state.passwordInputValue),
      repeatPasswordInputError: validateRepeatPassword(
        state.passwordInputValue,
        state.repeatPasswordInputValue,
      ),
    }));
  }

  private onUserChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      userInputValue: e.target.value,
    });
  };

  private onUserNameInputFocus = (e: FocusEvent<HTMLInputElement>): void => {
    this.setState({
      loginInputError: null,
      loginInputHasBeenTouched: true,
    });
  };

  private onUserNameInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    this.setState({
      loginInputError: validateUserName(e.target.value),
    });
  };

  private onPasswordInputFocus = (e: FocusEvent<HTMLInputElement>): void => {
    this.setState({
      passwordInputError: null,
      repeatPasswordInputError: null,
      passwordInputHasBeenTouched: true,
    });
  };

  private onPasswordInputBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const { repeatPasswordInputValue } = this.state;

    this.setState({
      passwordInputError: validateUserPassword(value),
      repeatPasswordInputError: validateRepeatPassword(
        value,
        repeatPasswordInputValue,
      ),
    });
  };

  private onRepeatPasswordInputFocus = (
    e: FocusEvent<HTMLInputElement>,
  ): void => {
    this.setState({
      passwordInputError: null,
      repeatPasswordInputError: null,
      repeatPasswordInputHasBeenTouched: true,
    });
  };

  private onRepeatPasswordInputBlur = (
    e: FocusEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target;
    const { passwordInputValue } = this.state;

    this.setState({
      passwordInputError: validateUserPassword(passwordInputValue),
      repeatPasswordInputError: validateRepeatPassword(
        passwordInputValue,
        value,
      ),
    });
  };

  private onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      passwordInputValue: e.target.value,
    });
  };

  private onRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      repeatPasswordInputValue: e.target.value,
    });
  };

  private onPasswordVisibleClick = (e: MouseEvent): void => {
    this.setState((state) => ({
      passwordVisible: !state.passwordVisible,
    }));
  };

  private onRepeatPasswordVisibleClick = (e: MouseEvent): void => {
    this.setState((state) => ({
      repeatPasswordVisible: !state.repeatPasswordVisible,
    }));
  };

  private renderUserNameInput(): React.ReactNode {
    const { classes } = this.props;
    const {
      userInputValue,
      loginInputError,
      loginInputHasBeenTouched,
    } = this.state;

    return (
      <TextField
        id="userName"
        name="userName"
        className={classes.input}
        placeholder={LoginTexts.UserNameInputPlaceholder}
        fullWidth={true}
        onChange={this.onUserChange}
        value={userInputValue}
        onFocus={this.onUserNameInputFocus}
        onBlur={this.onUserNameInputBlur}
        helperText={(loginInputHasBeenTouched && loginInputError) || ' '}
        FormHelperTextProps={{
          className: classes.errorText,
          error: !!loginInputError,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountBox color="primary" />
            </InputAdornment>
          ),
        }}
        size="medium"
        type="text"
      />
    );
  }

  private renderPasswordInput(): React.ReactNode {
    const { classes } = this.props;
    const {
      passwordInputValue,
      passwordVisible,
      passwordInputError,
      passwordInputHasBeenTouched,
    } = this.state;

    return (
      <TextField
        id="password"
        name="password"
        className={classes.input}
        placeholder={LoginTexts.UserPasswordInputPlaceholder}
        fullWidth={true}
        onChange={this.onPasswordChange}
        value={passwordInputValue}
        onFocus={this.onPasswordInputFocus}
        onBlur={this.onPasswordInputBlur}
        helperText={(passwordInputHasBeenTouched && passwordInputError) || ' '}
        FormHelperTextProps={{
          className: classes.errorText,
          error: !!passwordInputError,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment
              position="end"
              onClick={this.onPasswordVisibleClick}
            >
              {passwordVisible ? (
                <VisibilityOutlined color="action" />
              ) : (
                <VisibilityOffOutlined color="action" />
              )}
            </InputAdornment>
          ),
        }}
        size="medium"
        type={passwordVisible ? 'text' : 'password'}
      />
    );
  }

  private renderRepeatPasswordInput(): React.ReactNode {
    const { classes } = this.props;
    const {
      mode,
      repeatPasswordInputValue,
      repeatPasswordVisible,
      repeatPasswordInputError,
      repeatPasswordInputHasBeenTouched,
    } = this.state;
    let wrapperClassNames = classes.repeatPasswordInputWrapper;

    if (mode === 'register') {
      wrapperClassNames += ` ${classes.repeatPasswordInputWrapperVisible}`;
    }

    return (
      <div className={wrapperClassNames}>
        <TextField
          id="repeatPassword"
          name="repeatPassword"
          className={classes.input}
          placeholder={LoginTexts.UserRepeatPasswordInputPlaceholder}
          fullWidth={true}
          onChange={this.onRepeatPasswordChange}
          value={repeatPasswordInputValue}
          onFocus={this.onRepeatPasswordInputFocus}
          onBlur={this.onRepeatPasswordInputBlur}
          helperText={
            (repeatPasswordInputHasBeenTouched && repeatPasswordInputError) ||
            ' '
          }
          FormHelperTextProps={{
            className: classes.errorText,
            error: !!repeatPasswordInputError,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock color="primary" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                onClick={this.onRepeatPasswordVisibleClick}
              >
                {repeatPasswordVisible ? (
                  <VisibilityOutlined color="action" />
                ) : (
                  <VisibilityOffOutlined color="action" />
                )}
              </InputAdornment>
            ),
          }}
          size="medium"
          type={repeatPasswordVisible ? 'text' : 'password'}
        />
      </div>
    );
  }

  private renderLoginRegisterToggleLink(): React.ReactNode {
    const { mode } = this.state;
    const linkText =
      mode === 'login'
        ? LoginTexts.NoAccountText
        : LoginTexts.AlreadyAccountText;

    return (
      <Button
        onClick={this.onToggleModeClick}
        className={this.props.classes.toggleButton}
        color="primary"
        size="small"
      >
        {linkText}
      </Button>
    );
  }

  private onToggleModeClick = (): void => {
    this.setState((state) => ({
      mode: state.mode === 'login' ? 'register' : 'login',
      userInputValue: '',
      passwordInputValue: '',
      repeatPasswordInputValue: '',
      repeatPasswordInputError: null,
      loginInputError: null,
      passwordInputError: null,
    }));
  };

  public render(): React.ReactNode {
    const { classes } = this.props;
    const { mode } = this.state;
    const buttonText =
      mode === 'login'
        ? LoginTexts.LoginButtonText
        : LoginTexts.RegisterButtonText;

    return (
      <form className={classes.form} onSubmit={this.onFormSubmit}>
        {this.renderUserNameInput()}
        {this.renderPasswordInput()}
        {this.renderRepeatPasswordInput()}
        <Button
          className={classes.submitButton}
          fullWidth={true}
          variant="contained"
          type="submit"
          color="primary"
          disabled={!this.isFormValid}
        >
          {buttonText}
        </Button>
        {this.renderLoginRegisterToggleLink()}
      </form>
    );
  }
}
// TODO fix typing
export const LoginForm = withStyles(styles as any)(LoginFormClass);
