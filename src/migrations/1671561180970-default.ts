import { MigrationInterface, QueryRunner } from "typeorm";

export class default1671561180970 implements MigrationInterface {
    name = 'default1671561180970'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "sold" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "properties" ALTER COLUMN "sold" DROP DEFAULT`);
    }

}
