import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common/decorators';
import { IAuthRepository } from './i-auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    // super(UserEntity, datasource.createEntityManager());
  }

  findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto);
    return user;
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
