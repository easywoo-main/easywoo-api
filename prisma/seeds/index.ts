import {questionnaireSeed} from "./questionnaire.seed";
import { PrismaClient } from '@prisma/client';
import {userSeed} from "./user.seed";
import {sentenceReportSeed} from "./sentenceReport.seed";

const prisma = new PrismaClient();
prisma.$connect();
(async function main() {
    await sentenceReportSeed(prisma)
    await questionnaireSeed(prisma);
    await userSeed(prisma);
    console.log("Seeding completed");
})()

prisma.$disconnect();