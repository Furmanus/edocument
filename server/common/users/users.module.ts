import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { AuthService } from './services/auth.service';
import { UserLoginValidationPipe } from './pipes/loginUser.pipe';
import { RegisterUserValidationPipe } from './pipes/registerUser.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    UsersService,
    AuthService,
    UserLoginValidationPipe,
    RegisterUserValidationPipe,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
