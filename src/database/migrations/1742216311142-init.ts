import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742216311142 implements MigrationInterface {
    name = 'Init1742216311142'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "questionnaire_answers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answer" text array NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "question_id" uuid, "user_id" uuid, CONSTRAINT "PK_353fef8e031908634816fa91fd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" ADD CONSTRAINT "FK_9ee181c3b99496a2f6c6a17f52b" FOREIGN KEY ("question_id") REFERENCES "questionnaires"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" ADD CONSTRAINT "FK_4a4166183e88504f0b163146e3c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" DROP CONSTRAINT "FK_4a4166183e88504f0b163146e3c"`);
        await queryRunner.query(`ALTER TABLE "questionnaire_answers" DROP CONSTRAINT "FK_9ee181c3b99496a2f6c6a17f52b"`);
        await queryRunner.query(`DROP TABLE "questionnaire_answers"`);
    }

}
