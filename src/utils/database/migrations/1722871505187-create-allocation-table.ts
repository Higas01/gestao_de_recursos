import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class CreateAllocationTable1722871505187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "allocations",
            columns: [
                {
                    name: "id",
                    type: "bigint",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "date",
                    type: "date",
                },
                {
                    name: "returnDate",
                    type: "date",
                },
            ],
        }))

        await queryRunner.addColumns(
            "allocations",
            [
                new TableColumn({
                    name: "userId",
                    type: "bigint",
                }),
                new TableColumn({
                    name: "resourceId",
                    type: "bigint",
                }),
            ]
        )

        await queryRunner.createForeignKeys(
            "allocations",
            [
                new TableForeignKey({
                    columnNames: ["userId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "users",
                    onDelete: "CASCADE",
                }),
                new TableForeignKey({
                    columnNames: ["resourceId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "resources",
                    onDelete: "CASCADE",
                })
            ],
        )

    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("allocation");
    }

}
