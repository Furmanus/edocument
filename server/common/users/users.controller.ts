import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UserLoginValidationPipe } from './pipes/loginUser.pipe';
import { RegisterUserValidationPipe } from './pipes/registerUser.pipe';

@Controller('/users')
export class UsersController {
  public constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async createUser(
    @Body(RegisterUserValidationPipe) body: UserDto,
  ): Promise<void> {
    await this.usersService.create(body);
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  public async loginUser(
    @Body(UserLoginValidationPipe) body: UserDto,
  ): Promise<void> {}
}
