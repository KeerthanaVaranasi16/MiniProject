import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration131707216814630 implements MigrationInterface {
    name = 'Migration131707216814630'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "isAvailable" boolean NOT NULL DEFAULT true`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "isAvailable"`);
    }

}
