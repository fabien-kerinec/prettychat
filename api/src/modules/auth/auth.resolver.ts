import { Controller } from '@nestjs/common';
import { Mutation, Args } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    const { access_token } = await this.authService.login({
      email,
      password,
    });

    return access_token;
  }
}
