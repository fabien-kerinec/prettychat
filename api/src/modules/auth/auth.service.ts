import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserInputError } from 'apollo-server-express';
import { checkPassword } from '../../utils/checkPasswords';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { SilentError } from '../../utils/errors/SilentError';
import { UsersService } from '../users/users.service';
import { LoginInput } from './inputs/login.input';

export interface JWTPayload {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(params: LoginInput): Promise<JWTPayload> {
    try {
      const user = await this.usersService.findOne(params.email);
      console.log(params);

      if (!user || !checkPassword(params.password, user.password)) {
        throw new UserInputError(ErrorMessage.WRONG_CREDENTIALS);
      }

      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtTokenService.sign(payload),
      };
    } catch (error) {
      throw new SilentError(ErrorMessage.WRONG_CREDENTIALS);
    }
  }
}
