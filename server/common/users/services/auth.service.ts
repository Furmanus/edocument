import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { IApiError } from '../../../../common/interfaces/interfaces';
import { ErrorCodes } from '../../../../common/constants/errors';
import {
  LoginFormFields,
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
} from '../../../../common/constants/loginForm';
import { EncryptService } from './encrypt.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class AuthService {
  public constructor(
    private usersService: UsersService,
    private encryptService: EncryptService,
  ) {}

  public async validateUserRegister(
    userName: string,
    password: string,
  ): Promise<IApiError[]> {
    const user = await this.usersService.findUser(userName);
    const errors: IApiError[] = [];

    if (user) {
      errors.push({
        errorCode: ErrorCodes.RegisterUserAlreadyExists,
        message: 'User already exists',
        fieldName: LoginFormFields.UserName,
      });
    } else {
      if (userName.length < USERNAME_MIN_LENGTH) {
        errors.push({
          errorCode: ErrorCodes.UserNameTooShort,
          message: 'User name too short',
          fieldName: LoginFormFields.UserName,
        });
      }
      if (password.length < PASSWORD_MIN_LENGTH) {
        errors.push({
          errorCode: ErrorCodes.PasswordTooShort,
          message: 'Password too short',
          fieldName: LoginFormFields.Password,
        });
      }
    }

    return errors;
  }

  public async validateUserLogin(
    userName: string,
    password: string,
  ): Promise<IApiError[] | User> {
    const user = await this.usersService.findUser(userName);
    const doesPasswordMatch = await this.encryptService.compareText(
      password,
      user.password,
    );

    if (!user || !doesPasswordMatch) {
      return [
        {
          errorCode: ErrorCodes.InvalidUserOrPassword,
          message: 'Invalid user or password',
          fieldName: LoginFormFields.UserName,
        },
        {
          errorCode: ErrorCodes.InvalidUserOrPassword,
          message: 'Invalid user or password',
          fieldName: LoginFormFields.Password,
        },
      ];
    }

    return user;
  }
}
