import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602613219414 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'orphanages',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment"
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'latitude',
            type: 'decimal',
            scale: 10,
            precision: 2
          },
          {
            name: 'longitude',
            type: 'decimal',
            scale: 10,
            precision: 2
          },
          {
            name: 'about',
            type: 'text'
          },
          {
            name: 'instructions',
            type: 'text'
          },
          {
            name: 'open_on_weekends',
            type: 'boolean',
            default: false
          },
          {
            name: 'opening_hours',
            type: 'varchar',
          },
          {
            name: 'user_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'whatsapp',
            type: 'varchar',
          },
          {
            name: 'approved',
            type: 'boolean',
            default: false,
          },
        ], foreignKeys: [
          {
            name: 'OrphanageApproval',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }
        ]
      }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
