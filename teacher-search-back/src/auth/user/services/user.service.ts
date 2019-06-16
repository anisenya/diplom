import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { USER_INFO_MODEL, USER_MODEL } from '../../../constants/constants';
import { CreateUserDto } from '../dto/create-user.dto';
import { User, UserInfo } from '../interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL) private readonly userModel: Model<User>,
    @InjectModel(USER_INFO_MODEL) private readonly userInfoModel: Model<UserInfo>,
  ) {}

  async create(
    {
      login,
      password,
      role,
      avatarUrl,
      firstName,
      secondName,
      lastName,
      faculty,
      department,
  }: CreateUserDto): Promise<User> {

    const data = {
      login,
      password,
      role,
      avatarUrl: 'http://saltlifetherapy.ie/wp-content/uploads/2018/11/no-photo-1.png',
      firstName,
      secondName,
      lastName,
    };
    let createdUserInfo;

    if (role === 'teacher') {
      createdUserInfo = new this.userInfoModel({
        ...data,
        faculty,
        department,
        status: '',
        housingNumber: 0,
        cabinetNumber: 0,
      });
    } else {
      createdUserInfo = new this.userInfoModel(data);
    }
    const createdUser = new this.userModel({
      login,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      info: createdUserInfo._id,
    });
    await createdUser.save()
    return await createdUserInfo.save();
  }

  async findTeachersInfoByName(
    substring: string = '',
    department: string = '',
    faculty: string = '',
    limit: number,
    offset: number = 0,
  ): Promise<UserInfo[]> {
    return await this.userInfoModel
      .find({
        role: 'teacher',
        department: { $regex: `^${department}`, $options: 'i' },
        faculty: { $regex: `^${faculty}`, $options: 'i' },
        secondName: { $regex: `^${substring}`, $options: 'i' } })
      .skip(limit * offset)
      .limit(limit)
      .exec();
  }

  async findTeachersInfoByParameters(
    department: string = '',
    faculty: string = '',
  ): Promise<UserInfo[]> {
    return await this.userInfoModel.find({ department, faculty}).exec();
  }

  async findOneByLogin(login: string): Promise<User> {
    return await this.userModel.findOne({ login });
  }

  async findAllInfo(): Promise<UserInfo[]> {
    return await this.userInfoModel.find();
  }

  async findUserInfoByLogin(login: string): Promise<UserInfo> {
    return await this.userInfoModel.findOne({ login });
  }

  async findUserInfoById(id: string): Promise<UserInfo> {
    return await this.userInfoModel.findById(id);
  }

  async findByIdAndUpdateUserData(id: string, user) {
    const newUser = {
      ...user,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    };
    return await this.userModel.findOneAndUpdate({login: user.login}, newUser);
  }
  async findByIdAndUpdate(id: string, data: any): Promise<UserInfo> {
    return await this.userInfoModel.findByIdAndUpdate(id, data, {new: true});
  }

  async deleteUser(login: string): Promise<any> {
    await this.userModel.findOneAndDelete({login})

    return await this.userInfoModel.findOneAndDelete({login});
  }

  async getTeachersCount(): Promise<number> {
    return await this.userInfoModel.count({role: 'teacher'});
  }
}
