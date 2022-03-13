import { Controller } from '@nestjs/common';
import { Mutation, Args } from '@nestjs/graphql';
import { UserCreateInput } from '../users/inputs/user-create-input';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(@Args('input') input: UserCreateInput): Promise<string> {
    const { access_token } = await this.authService.login({
      email: input.email,
      password: input.password,
    });

    return access_token;
  }
}
