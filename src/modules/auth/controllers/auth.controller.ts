import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common/decorators';
import { LoginUserDto } from '../dto/login-user.dto';
import { SignUpUserDto } from '../dto/signUp-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { Protected } from 'src/common/guards/protected.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
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
  ): Promise<{ user: string }> {
    try {
      const user = await this.authService.login(loginUserDto);

      return {
        user,
      };
    } catch (error) {
      throw error;
    }
  }

  @ApiBearerAuth('JWT')
  @UseGuards(Protected)
  @Put(':id')
  async changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: any,
  ): Promise<UserEntity> {
    console.log('hello');
    return null;
  }
}
