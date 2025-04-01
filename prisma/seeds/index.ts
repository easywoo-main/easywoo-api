import { PrismaClient } from '@prisma/client';
import { userSeed } from './user.seed';
import { reportSeed } from './report';
import { questionnaireSeed } from './questionnaire.seed';

const prisma = new PrismaClient();
prisma.$connect();
(async function main() {
  await questionnaireSeed(prisma);
  await reportSeed(prisma);
  await userSeed(prisma);
  console.log('Seeding completed');
})();

prisma.$disconnect();
