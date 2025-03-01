import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1740828462940 implements MigrationInterface {
    name = 'Migration1740828462940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "available-tasks" ("id" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "duration" integer NOT NULL, CONSTRAINT "PK_f3c9cf4f8823b7c675f29e83704" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bots" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" text NOT NULL, CONSTRAINT "PK_8b1b0180229dec2cbfdf5e776e4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" text NOT NULL, "completed_at" date, "available_task_id" text, "bot_id" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_7206aaca51d4abf4ea4edcd96cc" FOREIGN KEY ("available_task_id") REFERENCES "available-tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_a6533b4e17fe50feca37859ca15" FOREIGN KEY ("bot_id") REFERENCES "bots"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_a6533b4e17fe50feca37859ca15"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_7206aaca51d4abf4ea4edcd96cc"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "bots"`);
        await queryRunner.query(`DROP TABLE "available-tasks"`);
    }

}
