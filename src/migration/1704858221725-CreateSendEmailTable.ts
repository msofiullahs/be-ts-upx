import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSendEmailTable1704858221725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'send_emails',
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
                        name: "sent_status",
                        type: "boolean",
                        default: 0
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
        await queryRunner.dropTable("send_emails", true);
    }

}
