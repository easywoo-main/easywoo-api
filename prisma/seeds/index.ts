import { questionnaireSeed } from './questionnaire.seed';
import { PrismaClient } from '@prisma/client';
import { userSeed } from './user.seed';
import { sentenceSeed } from './sentence.seed';

const prisma = new PrismaClient();
prisma.$connect();
(async function main() {
  await questionnaireSeed(prisma);
  await sentenceSeed(prisma);
  await userSeed(prisma);
  console.log('Seeding completed');
})();

prisma.$disconnect();
