import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration11706523927270 implements MigrationInterface {
    name = 'Migration11706523927270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("customer_id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "phone" integer NOT NULL, CONSTRAINT "PK_cde3d123fc6077bcd75eb051226" PRIMARY KEY ("customer_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
