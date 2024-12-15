import { Inject, Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<UserEntity[]> {
    const user = await this.userRepository.find();
    return user;
  }

  //   async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //     await this.userRepository.update(id, updateUserDto);
  //     return this.userRepository.findOne(id);
  //   }
}
