import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { UserController } from './controllers/user.controller';
import { AuthRepository } from './repositories/auth.repository';
import { Module } from '@nestjs/common/decorators';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthRepository, AuthService],
  controllers: [UserController],
})
export class AuthModule {}
