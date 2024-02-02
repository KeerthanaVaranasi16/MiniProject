import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration91706778159841 implements MigrationInterface {
    name = 'Migration91706778159841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "package" TO "packages"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME COLUMN "packages" TO "package"`);
    }

}
