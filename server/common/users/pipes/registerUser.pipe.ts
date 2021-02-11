import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { UserDto } from '../dto/users.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RegisterUserValidationPipe implements PipeTransform {
  public constructor(private authService: AuthService) {}

  public async transform(
    value: UserDto,
    metadata: ArgumentMetadata,
  ): Promise<UserDto> {
    const { password, userName } = value;

    const errors = await this.authService.validateUserRegister(
      userName,
      password,
    );

    if (errors.length) {
      throw new BadRequestException(errors);
    }

    return value;
  }
}
