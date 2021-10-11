import {MigrationInterface, QueryRunner} from "typeorm";

export class addDateTodo1627312123640 implements MigrationInterface {
    name = 'addDateTodo1627312123640'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "created_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "created_at"`);
    }

}
