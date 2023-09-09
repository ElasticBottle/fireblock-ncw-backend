import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1676564237412 implements MigrationInterface {
  name = "Init1676564237412";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS \`message\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`user\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`wallet\``);
    await queryRunner.query(`DROP TABLE IF EXISTS \`device\``);

    await queryRunner.query(
      `CREATE TABLE \`message\` (\`id\` int NOT NULL AUTO_INCREMENT, \`deviceId\` varchar(64) NOT NULL, \`message\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`sub\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_3641ff83ff7c23b2760b3df56d\` (\`sub\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`wallet\` (\`id\` varchar(64) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`device\` (\`id\` varchar(64) NOT NULL, \`userId\` int NOT NULL, \`walletId\` varchar(64) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`device\``);
    await queryRunner.query(`DROP TABLE \`wallet\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_3641ff83ff7c23b2760b3df56d\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`message\``);
  }
}
