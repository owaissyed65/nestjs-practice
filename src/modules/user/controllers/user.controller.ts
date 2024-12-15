import { Body, Controller, Get, Post } from '@nestjs/common/decorators';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: UserEntity }> {
    const user = await this.userService.createUser(createUserDto);
    return {
      user,
    };
  }

  @Get()
  async findAllUsers(): Promise<{ users: UserEntity[] }> {
    const users = await this.userService.findAllUsers();
    return {
      users,
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
