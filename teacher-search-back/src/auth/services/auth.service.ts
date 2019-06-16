import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../user/services/user.service';
import { ResponseData } from '../interfaces/response-data.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Token } from '../interfaces/token.interface';
import { config } from '../../common/config/config';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private createToken(user: JwtPayload): Token {
    const expiresIn = new Date(+(new Date()) + config.auth.expires * 1000);
    return {
      expiresIn,
      accessToken: this.jwtService.sign(user, { expiresIn: config.auth.expires }),
    };
  }

  async validateUserByPassword(
    loginAttempt: LoginUserDto,
  ): Promise<ResponseData> {
    const { login, password } = await this.userService.findOneByLogin(
      loginAttempt.login,
    );

    if (!compareSync(loginAttempt.password, password)) {
      throw new UnauthorizedException();
    }

    return {
      user: await this.userService.findUserInfoByLogin(login),
      token: this.createToken({ login }),
    };
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserInfoByLogin(payload.login);

    if (!user) { throw new UnauthorizedException(); }

    return user;
  }
}
