import { Injectable } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { Repository } from 'typeorm';
import { AlbumEntity } from '../entities/album.entity';
import { IAlbumRepository } from './i-album.repository';

@Injectable()
export class AlbumRepository implements IAlbumRepository {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumEntity: Repository<AlbumEntity>,
  ) {
    // super(AlbumEntity, datasource.createEntityManager());
  }
}
