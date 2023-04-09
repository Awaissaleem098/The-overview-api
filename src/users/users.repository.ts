import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { userDocument, User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  async createUser(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
