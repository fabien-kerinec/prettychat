import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Seeder } from 'nestjs-seeder';
import { Users } from '../modules/users/users.entity';
import { hashPassword } from '../utils/hash-password';

@Injectable()
export class UsersSeeder implements Seeder {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: EntityRepository<Users>,
  ) {}

  async seed() {
    const hash = await hashPassword('P@ssword1');

    const user = this.usersRepository.create({
      email: 'fabien@test.fr',
      password: hash,
    });

    this.usersRepository.persistAndFlush([user]);
  }

  async drop() {
    const users = await this.usersRepository.findAll();

    users.forEach((user) => this.usersRepository.remove(user));
    this.usersRepository.flush();
  }
}
