import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginUserDto } from './user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async logIn(@Body() user: LoginUserDto) {
    return await this.authService.validateUserByPassword(user);
  }
}
