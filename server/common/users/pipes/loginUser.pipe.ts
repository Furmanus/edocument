import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { AuthService } from '../services/auth.service';
import { User } from '../schemas/user.schema';
import { isApiErrorArray } from '../interfaces/typeGuards';

@Injectable()
export class UserLoginValidationPipe implements PipeTransform {
  public constructor(private authService: AuthService) {}

  public async transform(
    value: UserDto,
    metadata: ArgumentMetadata,
  ): Promise<User> {
    const { password, userName } = value;
    const userValidation = await this.authService.validateUserLogin(
      userName,
      password,
    );

    if (isApiErrorArray(userValidation)) {
      throw new UnauthorizedException(userValidation);
    }

    return userValidation;
  }
}
