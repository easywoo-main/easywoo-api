import { PrismaClient } from '@prisma/client';
import { Seeder } from './main/seeder.interface';
import * as seeders from './index';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger: Logger = new Logger();

(async function main() {
  try {

    await prisma.$connect();
    logger.log('Seeding started');

    for (const SeedClass of Object.values(seeders)) {
      const seederInstance: Seeder = new SeedClass();
      await seederInstance.run(prisma);
    }

    logger.log('Seeding completed successfully');
  } catch (error) {
    logger.error('Seeding failed', error);
  } finally {
    await prisma.$disconnect();
  }
})();
