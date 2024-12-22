import { Module } from '@nestjs/common/decorators';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [AlbumModule],
})
export class MusicModule {}
