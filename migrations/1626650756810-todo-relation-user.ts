import { MigrationInterface, QueryRunner } from 'typeorm';

export class todoRelationUser1626650756810 implements MigrationInterface {
  name = 'todoRelationUser1626650756810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ADD "created_by" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_ee9efa55280c90f86b189e5fb88" FOREIGN KEY ("created_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_ee9efa55280c90f86b189e5fb88"`,
    );
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "created_by"`);
  }
}
