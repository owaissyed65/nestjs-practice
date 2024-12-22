import { Injectable } from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SignUpUserDto } from '../dto/signUp-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { IAuthRepository } from '../repositories/i-auth.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    // private readonly configService: ConfigService,
  ) {}

  async signUp(createUserDto: SignUpUserDto): Promise<UserEntity> {
    const user = await this.authRepository.createUser(createUserDto);
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<string> {
    const user = await this.authRepository.findByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (user.password !== loginUserDto.password) {
      throw new BadRequestException('Invalid credentials');
    }
    const { email, id } = user;
    let accessToken = this.jwtService.sign({ email, user });
    return accessToken;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const users = await this.authRepository.findAllUsers();
    return users;
  }
}
