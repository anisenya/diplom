import { UserLogin } from './user-login';
export interface UserAuth {
  user: UserLogin;
  token: {
    expiresIn: number;
    accessToken: string;
  };
}
