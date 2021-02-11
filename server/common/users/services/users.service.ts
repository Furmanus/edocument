import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from '../dto/users.dto';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  public constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
  ) {}

  public create(user: UserDto): Promise<User> {
    const createdUser = new this.UserModel(user);

    return createdUser.save();
  }

  public findUser(userName: string): Promise<User> {
    return this.UserModel.findOne({ userName }).exec();
  }
}
