import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration21706524643046 implements MigrationInterface {
    name = 'Migration21706524643046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("order_id" SERIAL NOT NULL, "orderDate" TIMESTAMP NOT NULL, "totalAmount" integer NOT NULL, CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
