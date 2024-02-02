import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration31706525155502 implements MigrationInterface {
    name = 'Migration31706525155502'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "customerCustomerId" integer`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_39db5324a2b0834d6b4585c872b" FOREIGN KEY ("customerCustomerId") REFERENCES "customer"("customer_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_39db5324a2b0834d6b4585c872b"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "customerCustomerId"`);
    }

}
