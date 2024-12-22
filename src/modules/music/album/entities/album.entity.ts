import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('album')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  album_name: string;

  @Column()
  album_created: string;

  @Column()
  album_updated: string;

  @Column({ foreignKeyConstraintName: 'users.id' })
  user_id: number;
}
