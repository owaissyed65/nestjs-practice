import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdateActiveToRole1734890005018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'isActive');
    await queryRunner.query(`UPDATE users SET role = 0`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'isActive',
        type: 'varchar', // Use 'varchar' for string type in MSSQL
        isNullable: true, // Set column as nullable
      }),
    );
  }
}
