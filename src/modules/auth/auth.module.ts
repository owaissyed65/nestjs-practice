import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repositories/auth.repository';
import { Module } from '@nestjs/common/decorators';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    PassportModule,
    JwtModule.register({
      secret: 'owais123', // Replace with your secret key
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [JwtStrategy, AuthRepository, AuthService],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
