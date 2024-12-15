import { Body, Controller, Get, Post } from '@nestjs/common/decorators';
import { SignUpUserDto } from '../dto/signUp-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dto/login-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(
    @Body() createUserDto: SignUpUserDto,
  ): Promise<{ user: UserEntity }> {
    const user = await this.authService.signUp(createUserDto);
    return {
      user,
    };
  }

  @Get()
  async findAllUsers(): Promise<{ users: UserEntity[] }> {
    const users = await this.authService.findAllUsers();
    return {
      users,
    };
  }

  @Post('/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ user: UserEntity }> {
    const user = await this.authService.login(loginUserDto);

    return {
      user,
    };
  }
  //   @Put(':id')
  //   async updateUser(
  //     @Param('id') id: number,
  //     @Body() updateUserDto: UpdateUserDto,
  //   ): Promise<UserEntity> {
  //     return this.userService.updateUser(id, updateUserDto);
  //   }
}
