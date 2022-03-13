import { MikroOrmModule } from '@mikro-orm/nestjs';
import { seeder } from 'nestjs-seeder';
import { Users } from './modules/users/users.entity';
import { UsersSeeder } from './seeder/users';

seeder({
  imports: [MikroOrmModule.forRoot(), MikroOrmModule.forFeature([Users])],
}).run([UsersSeeder]);
