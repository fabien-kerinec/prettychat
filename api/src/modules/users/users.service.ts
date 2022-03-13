import { wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ErrorMessage } from '../../utils/errors/ErrorMessage';
import { hashPassword } from '../../utils/hash-password';
import { UserCreateInput } from './inputs/user-create-input';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: EntityRepository<Users>,
  ) {}

  async findOneById(id: number): Promise<Users | undefined> {
    return this.userRepository.findOne({ id });
  }
  async findOne(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({ email });
  }
  async create(input: UserCreateInput): Promise<Users> {
    const checkEmail = await this.userRepository.findOne({
      email: input.email,
    });
    if (checkEmail) {
      throw new Error(ErrorMessage.EMAIL_ALREADY_EXISTS);
    }
    const user = new Users();

    wrap(user).assign({
      email: input.email,
      password: hashPassword(input.password),
    });

    await this.userRepository.persistAndFlush(user);

    return user;
  }
}
