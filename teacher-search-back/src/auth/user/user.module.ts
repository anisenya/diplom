import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { USER_MODEL, USER_INFO_MODEL } from '../../constants/constants';
import { UserSchema } from './schemas/user.schema';
import { UserInfoSchema } from './schemas/user.info.schema';
import { UserService } from './services/user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: USER_MODEL, schema: UserSchema },
      { name: USER_INFO_MODEL, schema: UserInfoSchema },
    ]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
