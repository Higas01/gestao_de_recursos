import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1722789894683 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "255",
                },
                {
                    name: "isAdmin",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "255",
                    isUnique: true,
                },
            ]
        }))
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
