import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/users.dto';
import { UsersService } from '../services/users.service';

@Controller('/users')
export class UsersController {
  public constructor(private usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  public async createUser(@Body() body: CreateUserDto): Promise<void> {
    const { password, userName } = body;

    try {
      await this.usersService.create({
        userName,
        password,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
