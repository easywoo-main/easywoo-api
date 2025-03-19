import {questionnaireSeed} from "./questionnaire.seed";

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$connect();
(async function main() {
    await questionnaireSeed(prisma);
    console.log("Seeding completed");
})()

prisma.$disconnect();