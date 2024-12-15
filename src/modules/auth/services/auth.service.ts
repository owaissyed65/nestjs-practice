import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpUserDto } from '../dto/signUp-user.dto';
import { UserEntity } from '../entities/user.entity';
import { AuthRepository } from '../repositories/auth.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  async signUp(createUserDto: SignUpUserDto): Promise<UserEntity> {
    const user = this.authRepository.create(createUserDto);
    return this.authRepository.save(user);
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.authRepository.findByEmail(loginUserDto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    if (user.password !== loginUserDto.password) {
      throw new BadRequestException('Invalid credentials');
    }
    
    return user;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const user = await this.authRepository.find();
    return user;
  }

  //   async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //     await this.authRepository.update(id, updateUserDto);
  //     return this.userRepository.findOne(id);
  //   }
}