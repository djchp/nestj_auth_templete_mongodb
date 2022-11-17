import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}


    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec()
    }


    async create(
        email:string,
        hashedPassword: string,
    ) : Promise<UserDocument> {
        const newUser = new this.userModel({
            email,
            password: hashedPassword
        });
        return newUser.save()
    }
}
