import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration61706526557929 implements MigrationInterface {
    name = 'Migration61706526557929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" SERIAL NOT NULL, "productName" character varying NOT NULL, "unitPrice" integer NOT NULL, "package" character varying NOT NULL, "isDiscontinued" boolean NOT NULL, "supplierSupplierId" integer, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD "productProductId" integer`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660" FOREIGN KEY ("supplierSupplierId") REFERENCES "supplier"("supplier_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_ccd2fd288ac4e0ee2d34e1eb733" FOREIGN KEY ("productProductId") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_ccd2fd288ac4e0ee2d34e1eb733"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_9c8147145b290c8c4cfc64a9660"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP COLUMN "productProductId"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
