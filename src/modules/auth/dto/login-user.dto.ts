import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @ApiProperty({
    description: 'The Email of the user',
    example: 'johndoe@example.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The Password of the user',
    example: 'johndoe@123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
