import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class AuthRepository extends Repository<UserEntity> {
  constructor(private datasource: DataSource) {
    super(UserEntity, datasource.createEntityManager());
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.findOne({ where: { email } });
  }
}
