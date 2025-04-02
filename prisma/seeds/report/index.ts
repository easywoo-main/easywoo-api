import { PrismaClient } from '@prisma/client';
import { userIntroductionSeed } from './userIntroduction.seed';
import { deepDiveSeed } from './deepDive.seed';
import { relationshipGoalsSeed } from './relationshipGoals.seed';
import { emotionalBaggageSeed } from './emtotionalBaggege.seed';
import { targetAudienceSeed } from './targetAudience.seed';
import { easySocialSeed } from './easySocial.seed';
import { finalConsiderationSeed } from './finalConsideration.seed';

async function main(prisma: PrismaClient) {
  await userIntroductionSeed(prisma);
  await deepDiveSeed(prisma);
  await relationshipGoalsSeed(prisma);
  await emotionalBaggageSeed(prisma);
  await targetAudienceSeed(prisma);
  await easySocialSeed(prisma);
  await finalConsiderationSeed(prisma);
}

export { main as reportSeed };
