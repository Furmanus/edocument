import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserLoginValidationPipe implements PipeTransform {
  public constructor(private authService: AuthService) {}

  public async transform(
    value: UserDto,
    metadata: ArgumentMetadata,
  ): Promise<UserDto> {
    const { password, userName } = value;
    const validationErrors = await this.authService.validateUserLogin(
      userName,
      password,
    );

    if (validationErrors.length) {
      throw new BadRequestException(validationErrors);
    }

    return value;
  }
}
