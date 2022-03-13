import { Injectable } from '@nestjs/common';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { SilentError } from '../../utils/errors/SilentError';
import { UsersService } from './users.service';

@Injectable()
export class UserGuard {
  constructor(private readonly usersService: UsersService) {}

  async checkCanCreate(email: string) {
    const account = await this.usersService.findOne(email);

    if (account) {
      throw new SilentError(ErrorMessage.EMAIL_ALREADY_EXISTS);
    }
  }
}
