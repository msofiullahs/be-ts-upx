import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1704858190114 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true
                    }
                ]
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true);
    }

}
