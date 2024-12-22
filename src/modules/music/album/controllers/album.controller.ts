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
import { AlbumEntity } from '../entities/album.entity';
import { AuthService } from '../services/album.service';
import { Protected } from 'src/common/guards/protected.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  

  // @ApiBearerAuth('JWT')
  // @UseGuards(Protected)
  // @Put(':id')
  
}
