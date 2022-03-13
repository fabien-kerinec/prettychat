import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Users } from './users.entity';
import { UserGuard } from './users.guard';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [MikroOrmModule.forFeature([Users])],
  providers: [UserResolver, UsersService, UserGuard],
  exports: [UsersService],
})
export class UsersModule {}
