import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserProfileTable1704858212129 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'user_profiles',
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "first_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "last_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "birthday",
                        type: "date",
                        isNullable: true
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
        await queryRunner.dropTable("user_profiles", true);
    }

}
