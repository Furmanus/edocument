import * as React from 'react';
import { ChangeEvent, FormEvent, MouseEvent } from 'react';

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

interface IState {
  readonly mode: 'login' | 'register';
  readonly userInputValue: string;
  readonly passwordInputValue: string;
  readonly repeatPasswordInputValue: string;
  readonly passwordVisible: boolean;
  readonly repeatPasswordVisible: boolean;
}

const styles = {
  form: {
    width: 'calc(100% - 70px)',
    padding: '30px 0',
  },
  input: {
    marginBottom: 24,
  },
  repeatPasswordInputWrapper: {
    maxHeight: 0,
    transition: 'max-height 0.3s ease-in-out',
  },
  repeatPasswordInputWrapperVisible: {
    maxHeight: 24 + 32,
  },
  toggleButton: {
    paddingLeft: 0,
    paddingTop: 0,
    marginTop: 24,
    textTransform: 'none',
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
  };

  private onFormSubmit = (e: FormEvent): void => {
    const formData = new FormData(e.target as HTMLFormElement);

    e.preventDefault();

    console.log(formData);
  };

  private onUserChange = (e: ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      userInputValue: e.target.value,
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
    const { userInputValue } = this.state;

    return (
      <TextField
        id="userName"
        name="userName"
        className={classes.input}
        placeholder={LoginTexts.UserNameInputPlaceholder}
        fullWidth={true}
        onChange={this.onUserChange}
        value={userInputValue}
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
    const { passwordInputValue, passwordVisible } = this.state;

    return (
      <TextField
        id="password"
        name="password"
        className={classes.input}
        placeholder={LoginTexts.UserPasswordInputPlaceholder}
        fullWidth={true}
        onChange={this.onPasswordChange}
        value={passwordInputValue}
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
          fullWidth={true}
          variant="contained"
          type="submit"
          color="primary"
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
