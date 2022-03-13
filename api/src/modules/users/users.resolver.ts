import { Controller, UseGuards } from '@nestjs/common';
import { Query, ID, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGuard } from '../auth/guards/gql-auth.guard';
import { UserCreateInput } from './inputs/user-create-input';
import { Users } from './users.entity';
import { UserGuard } from './users.guard';
import { UsersService } from './users.service';

@Controller()
export class UserResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly userGuard: UserGuard,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => Users)
  users(@Args('id', { type: () => ID }) id: number) {
    return this.userService.findOneById(id);
  }

  @Mutation(() => Users)
  async createUser(@Args('input') input: UserCreateInput): Promise<Users> {
    if (input.email) {
      this.userGuard.checkCanCreate(input.email);
    }
    return this.userService.create(input);
  }
}
