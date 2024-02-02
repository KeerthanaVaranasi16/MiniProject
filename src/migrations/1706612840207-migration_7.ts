import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration71706612840207 implements MigrationInterface {
    name = 'Migration71706612840207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" character varying`);
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "supplier" ADD "phone" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "phone" integer NOT NULL`);
    }

}
