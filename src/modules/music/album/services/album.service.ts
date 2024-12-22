import { Injectable } from '@nestjs/common/decorators';

import { AlbumRepository } from '../repositories/album.repository';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly AlbumRepository: AlbumRepository,
    private readonly configServive: ConfigService,
  ) {}
}
