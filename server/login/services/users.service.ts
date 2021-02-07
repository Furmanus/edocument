import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/users.dto';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  public create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.UserModel(user);

    return createdUser.save();
  }
}
