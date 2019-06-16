import { UserInfo } from '../user/interfaces/user.interface';
import { Token } from './token.interface';

export interface ResponseData {
  user: UserInfo;
  token: Token;
}
