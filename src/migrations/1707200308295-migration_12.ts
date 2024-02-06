import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration121707200308295 implements MigrationInterface {
    name = 'Migration121707200308295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "checkOut" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "checkOut"`);
    }

}
