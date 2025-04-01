import { PrismaClient } from '@prisma/client';
import { userIntroductionSeed } from './userIntroduction.seed';
import { deepDiveSeed } from './deepDive.seed';
import { relationshipGoalsSeed } from './relationshipGoals.seed';
import { emotionalBaggageSeed } from './emtotionalBaggege.seed';

async function main(prisma: PrismaClient) {
  await userIntroductionSeed(prisma);
  await deepDiveSeed(prisma);
  await relationshipGoalsSeed(prisma);
  await emotionalBaggageSeed(prisma);
}

export { main as reportSeed };
