import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
} from '@nestjs/common';
import { UserDto } from './dto/users.dto';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { UserLoginValidationPipe } from './pipes/loginUser.pipe';
import { RegisterUserValidationPipe } from './pipes/registerUser.pipe';
import { EncryptService } from './services/encrypt.service';
import { IApplicationSession } from '../interfaces/interfaces';
import { User } from './schemas/user.schema';

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
    @Session() session: IApplicationSession,
    @Body(RegisterUserValidationPipe) body: UserDto,
  ): Promise<void> {
    const { password, userName } = body;
    const hashedPassword = await this.encryptService.hashText(password);
    const user = await this.usersService.create({
      password: hashedPassword,
      userName,
    });

    session.userName = body.userName;
    session.userId = user._id;
  }

  @Post('/auth')
  @HttpCode(HttpStatus.OK)
  public async loginUser(
    @Session() session: IApplicationSession,
    @Body(UserLoginValidationPipe) body: User & { _id?: string },
  ): Promise<void> {
    session.userName = body.userName;
    session.userId = body._id;
  }
}
