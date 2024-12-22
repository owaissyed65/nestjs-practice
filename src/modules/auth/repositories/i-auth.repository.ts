import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IAuthRepository {
  findByEmail(email: string): Promise<UserEntity | undefined>;
  createUser(userDto: CreateUserDto): Promise<UserEntity>;
}
