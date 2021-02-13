import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UserLoginValidationPipe } from './pipes/loginUser.pipe';
import { RegisterUserValidationPipe } from './pipes/registerUser.pipe';
import { EncryptService } from './services/encrypt.service';

@Controller('/users')
export class UsersController {
  public constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private encryptService: EncryptService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async createUser(
    @Body(RegisterUserValidationPipe) body: UserDto,
  ): Promise<void> {
    const { password, userName } = body;
    const hashedPassword = await this.encryptService.hashText(password);

    await this.usersService.create({
      password: hashedPassword,
      userName,
    });
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  public async loginUser(
    @Body(UserLoginValidationPipe) body: UserDto,
  ): Promise<void> {}
}
