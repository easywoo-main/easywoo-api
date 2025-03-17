import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742221229744 implements MigrationInterface {
    name = 'Init1742221229744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "picture" character varying, "isVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."questionnaires_type_enum" AS ENUM('single', 'multiple', 'slider')`);
        await queryRunner.query(`CREATE TABLE "questionnaires" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "step" integer NOT NULL, "question" text NOT NULL, "answers" text array NOT NULL, "type" "public"."questionnaires_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_a01d7cdea895ed9796b29233610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questionnaire_answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "question_id" uuid, "user_id" uuid, CONSTRAINT "PK_353fef8e031908634816fa91fd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" ADD CONSTRAINT "FK_9ee181c3b99496a2f6c6a17f52b" FOREIGN KEY ("question_id") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" ADD CONSTRAINT "FK_4a4166183e88504f0b163146e3c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" DROP CONSTRAINT "FK_4a4166183e88504f0b163146e3c"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" DROP CONSTRAINT "FK_9ee181c3b99496a2f6c6a17f52b"`);
        await queryRunner.query(`DROP TABLE "questionnaire_answers"`);
        await queryRunner.query(`DROP TABLE "questionnaires"`);
        await queryRunner.query(`DROP TYPE "public"."questionnaires_type_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
