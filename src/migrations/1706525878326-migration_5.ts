import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration51706525878326 implements MigrationInterface {
    name = 'Migration51706525878326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "supplier" ("supplier_id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "contactName" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "phone" integer NOT NULL, CONSTRAINT "PK_e0f8ee60663218082b83251cd85" PRIMARY KEY ("supplier_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "supplier"`);
    }

}
