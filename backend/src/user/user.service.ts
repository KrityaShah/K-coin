import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        const duplicateField = Object.keys(error.keyPattern)[0];
        throw new BadRequestException(`${duplicateField} already exists`);
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

    async findAll(): Promise<UserDocument[] | null>{
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null>{
        return this.userModel.findById(id).exec();
    }

    async findByEmail(email: string): Promise<UserDocument | null>{
        return this.userModel.findOne({email}).exec();
    }
}
